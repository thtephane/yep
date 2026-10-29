package org.yep.model;

import org.yep.contracts.Assessable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * ImpactProject: Represents a Level 2 Community / Cross-border Project
 * Implements: Assessable
 */
public class ImpactProject implements Assessable {
    private final String id;
    private String title;
    private String category;
    private String assignedTeamId;
    private int completionPercentage;
    private String nextTask;
    private final List<String> submittedArtifacts;
    private int score;

    public ImpactProject(String id, String title, String category, String assignedTeamId) {
        this.id = Objects.requireNonNull(id, "Project ID cannot be null");
        this.title = Objects.requireNonNull(title, "Title cannot be null");
        this.category = category != null ? category : "Digital Inclusion";
        this.assignedTeamId = assignedTeamId;
        this.completionPercentage = 0;
        this.nextTask = "Review Project Brief";
        this.submittedArtifacts = new ArrayList<>();
        this.score = 0;
    }

    @Override
    public int calculateScore() {
        return score;
    }

    @Override
    public boolean isPassed() {
        return score >= 60 && completionPercentage >= 80;
    }

    @Override
    public String getAssessmentSummary() {
        return String.format("Project '%s' Assessment: Completion %d%%, Score: %d/100, Status: %s",
                title, completionPercentage, score, isPassed() ? "APPROVED" : "IN_PROGRESS");
    }

    public void submitArtifact(String documentName) {
        if (documentName != null && !documentName.trim().isEmpty()) {
            submittedArtifacts.add(documentName);
        }
    }

    public void updateProgress(int newPercentage, String nextTask, int assignedScore) {
        this.completionPercentage = Math.min(100, Math.max(0, newPercentage));
        if (nextTask != null) {
            this.nextTask = nextTask;
        }
        this.score = Math.min(100, Math.max(0, assignedScore));
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

    public String getAssignedTeamId() {
        return assignedTeamId;
    }

    public void setAssignedTeamId(String assignedTeamId) {
        this.assignedTeamId = assignedTeamId;
    }

    public int getCompletionPercentage() {
        return completionPercentage;
    }

    public String getNextTask() {
        return nextTask;
    }

    public List<String> getSubmittedArtifacts() {
        return Collections.unmodifiableList(submittedArtifacts);
    }
}
