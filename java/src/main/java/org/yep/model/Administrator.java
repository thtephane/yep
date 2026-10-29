package org.yep.model;

import org.yep.contracts.Verifiable;

import java.time.LocalDateTime;

/**
 * Concrete Subclass: Administrator
 * Demonstrates:
 * - Inheritance: Subclasses User.
 * - Access control and governance over cohorts and platform settings.
 */
public class Administrator extends User implements Verifiable {
    private String department;
    private int approvedProgramsCount;

    public Administrator(String id, String fullName, String email, String country, String avatarUrl, String department) {
        super(id, fullName, email, country, avatarUrl);
        this.department = department != null ? department : "Operations";
        this.approvedProgramsCount = 0;
    }

    @Override
    public String getRoleTitle() {
        return "Administrator";
    }

    @Override
    public String displayRoleSummary() {
        return String.format("Admin %s | Department: %s | Programs Managed: %d",
                getFullName(), department, approvedProgramsCount);
    }

    @Override
    public String getPrimaryKpiMetric() {
        return String.format("%d Programs Supervised", approvedProgramsCount);
    }

    // --- Verifiable Implementation ---
    @Override
    public boolean verifyIdentity() {
        return isActive() && "Operations".equalsIgnoreCase(department) || "Governance".equalsIgnoreCase(department);
    }

    @Override
    public String getVerificationHash() {
        return "HASH-ADM-" + Integer.toHexString((getId() + department).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() {
        return getRegisteredAt();
    }

    public void incrementApprovedPrograms() {
        this.approvedProgramsCount++;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getApprovedProgramsCount() {
        return approvedProgramsCount;
    }
}
