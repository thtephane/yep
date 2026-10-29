package org.yep.model;

import org.yep.contracts.Verifiable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Concrete Subclass: Mentor
 * Demonstrates:
 * - Inheritance: Subclasses User.
 * - Encapsulation: Protects specialization field and assigned mentees list.
 * - Polymorphism: Customizes role summary and KPIs.
 */
public class Mentor extends User implements Verifiable {
    private String specialization;
    private final List<String> assignedMenteeIds;
    private int lecturesConducted;

    public Mentor(String id, String fullName, String email, String country, String avatarUrl, String specialization) {
        super(id, fullName, email, country, avatarUrl);
        this.specialization = specialization != null ? specialization : "General Digital Literacy";
        this.assignedMenteeIds = new ArrayList<>();
        this.lecturesConducted = 0;
    }

    @Override
    public String getRoleTitle() {
        return "Mentor";
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Instructor %s (%s) | %d Active Mentees | %d Lectures",
                getFullName(), specialization, assignedMenteeIds.size(), lecturesConducted);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Active Mentees", assignedMenteeIds.size());
    }

    // --- Verifiable Implementation ---
    @Override
    public boolean verifyIdentity() {
        return isActive() && specialization != null && !specialization.isEmpty();
    }

    @Override
    public String getVerificationHash() {
        return "HASH-MTR-" + Integer.toHexString((getId() + specialization).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() {
        return getRegisteredAt();
    }

    public void assignMentee(String studentId) {
        if (!assignedMenteeIds.contains(studentId)) {
            assignedMenteeIds.add(studentId);
        }
    }

    public void unassignMentee(String studentId) {
        assignedMenteeIds.remove(studentId);
    }

    public void recordLectureHeld() {
        this.lecturesConducted++;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<String> getAssignedMenteeIds() {
        return Collections.unmodifiableList(assignedMenteeIds);
    }

    public int getLecturesConducted() {
        return lecturesConducted;
    }
}
