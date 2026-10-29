package org.yep.model;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Abstract Base Class: User
 * Demonstrates:
 * - Abstraction: Cannot be directly instantiated; provides generic interface and contracts.
 * - Encapsulation: All state attributes are private and accessed via protected/public methods with validation.
 */
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

    // Abstract methods enforcing polymorphic behavior across subclasses
    public abstract String getRoleTitle();
    public abstract String displayRoleSummary();
    public abstract String getPrimaryKpiMetric();

    // Encapsulated Getters and Setters
    public String getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            throw new IllegalArgumentException("Full name cannot be empty");
        }
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s (%s, %s)", getRoleTitle(), fullName, email, country);
    }
}
