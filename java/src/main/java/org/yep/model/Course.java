package org.yep.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Encapsulated Course Entity
 * Composed of multiple Lesson objects (Composition pattern).
 */
public class Course {
    private final String id;
    private String title;
    private String category;
    private String mentorName;
    private final List<Lesson> lessons;
    private boolean active;

    public Course(String id, String title, String category, String mentorName) {
        this.id = Objects.requireNonNull(id, "Course ID cannot be null");
        this.title = Objects.requireNonNull(title, "Course title cannot be null");
        this.category = category != null ? category : "Digital Skills";
        this.mentorName = mentorName != null ? mentorName : "Assigned Mentor";
        this.lessons = new ArrayList<>();
        this.active = true;
    }

    public void addLesson(Lesson lesson) {
        lessons.add(Objects.requireNonNull(lesson, "Lesson cannot be null"));
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public List<Lesson> getLessons() {
        return Collections.unmodifiableList(lessons);
    }

    public int getTotalLessons() {
        return lessons.size();
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return String.format("Course[%s]: '%s' by %s (%d lessons)", id, title, mentorName, lessons.size());
    }
}
