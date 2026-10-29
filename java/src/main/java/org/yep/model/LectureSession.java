package org.yep.model;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Encapsulated Lecture Session entity for live masterclasses and webinars
 */
public class LectureSession {
    private final String id;
    private String title;
    private String mentorId;
    private String mentorName;
    private LocalDateTime scheduledTime;
    private int durationMinutes;
    private String meetingUrl;
    private boolean completed;

    public LectureSession(String id, String title, String mentorId, String mentorName,
                          LocalDateTime scheduledTime, int durationMinutes, String meetingUrl) {
        this.id = Objects.requireNonNull(id, "ID cannot be null");
        this.title = Objects.requireNonNull(title, "Title cannot be null");
        this.mentorId = mentorId;
        this.mentorName = mentorName;
        this.scheduledTime = scheduledTime != null ? scheduledTime : LocalDateTime.now().plusDays(1);
        this.durationMinutes = Math.max(15, durationMinutes);
        this.meetingUrl = meetingUrl;
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

    public String getMentorId() {
        return mentorId;
    }

    public String getMentorName() {
        return mentorName;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getMeetingUrl() {
        return meetingUrl;
    }

    public void setMeetingUrl(String meetingUrl) {
        this.meetingUrl = meetingUrl;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return String.format("LectureSession: '%s' by %s at %s (%d min)",
                title, mentorName, scheduledTime, durationMinutes);
    }
}
