package org.yep.model;

import org.yep.contracts.Collaborative;
import org.yep.contracts.Verifiable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Concrete Subclass: Student
 * Demonstrates:
 * - Inheritance: Extends User base class.
 * - Polymorphism: Overrides abstract methods from User.
 * - Multiple Interface Implementation: Implements Verifiable and Collaborative.
 */
public class Student extends User implements Verifiable, Collaborative {
    private int completedLessons;
    private int currentStreakDays;
    private final List<String> enrolledCourseIds;
    private final List<String> projectIds;
    private String assignedTeamId;

    public Student(String id, String fullName, String email, String country, String avatarUrl) {
        super(id, fullName, email, country, avatarUrl);
        this.completedLessons = 0;
        this.currentStreakDays = 0;
        this.enrolledCourseIds = new ArrayList<>();
        this.projectIds = new ArrayList<>();
    }

    public Student(String id, String fullName, String email, String country, String avatarUrl,
                   int completedLessons, int currentStreakDays) {
        super(id, fullName, email, country, avatarUrl);
        this.completedLessons = Math.max(0, completedLessons);
        this.currentStreakDays = Math.max(0, currentStreakDays);
        this.enrolledCourseIds = new ArrayList<>();
        this.projectIds = new ArrayList<>();
    }

    @Override
    public String getRoleTitle() {
        return "Student";
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Youth Participant %s | Streak: %d days | Completed Lessons: %d",
                getFullName(), currentStreakDays, completedLessons);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Lessons Done", completedLessons);
    }

    // --- Verifiable Implementation ---
    @Override
    public boolean verifyIdentity() {
        return isActive() && getEmail() != null && !getEmail().isEmpty();
    }

    @Override
    public String getVerificationHash() {
        return "HASH-STU-" + Integer.toHexString((getId() + getEmail()).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() {
        return getRegisteredAt();
    }

    // --- Collaborative Implementation ---
    @Override
    public void joinTeam(String teamId) {
        this.assignedTeamId = teamId;
    }

    @Override
    public void leaveTeam() {
        this.assignedTeamId = null;
    }

    @Override
    public String getAssignedTeamId() {
        return assignedTeamId;
    }

    @Override
    public boolean isCrossBorderEligible() {
        return getCountry() != null && !getCountry().trim().isEmpty();
    }

    // Domain Specific Methods
    public void enrollCourse(String courseId) {
        if (!enrolledCourseIds.contains(courseId)) {
            enrolledCourseIds.add(courseId);
        }
    }

    public void completeLesson() {
        this.completedLessons++;
    }

    public void incrementStreak() {
        this.currentStreakDays++;
    }

    public int getCompletedLessons() {
        return completedLessons;
    }

    public int getCurrentStreakDays() {
        return currentStreakDays;
    }

    public List<String> getEnrolledCourseIds() {
        return Collections.unmodifiableList(enrolledCourseIds);
    }

    public List<String> getProjectIds() {
        return Collections.unmodifiableList(projectIds);
    }

    public void addProject(String projectId) {
        if (!projectIds.contains(projectId)) {
            projectIds.add(projectId);
        }
    }
}
