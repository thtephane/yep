package org.yep.model;

import java.util.Objects;

/**
 * Encapsulated Lesson Entity
 */
public class Lesson {
    private final String id;
    private String title;
    private int durationMinutes;
    private String contentSummary;
    private boolean completed;

    public Lesson(String id, String title, int durationMinutes, String contentSummary) {
        this.id = Objects.requireNonNull(id, "Lesson ID required");
        this.title = Objects.requireNonNull(title, "Title required");
        this.durationMinutes = Math.max(1, durationMinutes);
        this.contentSummary = contentSummary;
        this.completed = false;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = Math.max(1, durationMinutes);
    }

    public String getContentSummary() {
        return contentSummary;
    }

    public void setContentSummary(String contentSummary) {
        this.contentSummary = contentSummary;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return String.format("Lesson: %s (%d mins)%s", title, durationMinutes, completed ? " [Done]" : "");
    }
}
