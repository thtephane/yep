package org.yep.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Team Model: Represents a cross-border Virtual Exchange team
 * Demonstrates:
 * - Encapsulation of member management.
 * - Validation of cross-border diversity (e.g. Uganda, Kenya, Rwanda, Tanzania).
 */
public class Team {
    private final String id;
    private String name;
    private String focalTopic;
    private final List<Student> members;
    private String mentorId;

    public Team(String id, String name, String focalTopic, String mentorId) {
        this.id = Objects.requireNonNull(id, "Team ID cannot be null");
        this.name = Objects.requireNonNull(name, "Team name cannot be null");
        this.focalTopic = focalTopic != null ? focalTopic : "Virtual Community Impact";
        this.mentorId = mentorId;
        this.members = new ArrayList<>();
    }

    public void addMember(Student student) {
        Objects.requireNonNull(student, "Member student cannot be null");
        if (!members.contains(student)) {
            members.add(student);
            student.joinTeam(this.id);
        }
    }

    public void removeMember(Student student) {
        if (members.remove(student)) {
            student.leaveTeam();
        }
    }

    /**
     * Checks if team meets the cross-border diversity criteria (at least 2 different countries represented).
     */
    public boolean hasCrossBorderDiversity() {
        Set<String> countries = new HashSet<>();
        for (Student student : members) {
            if (student.getCountry() != null) {
                countries.add(student.getCountry().trim().toLowerCase());
            }
        }
        return countries.size() >= 2;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFocalTopic() {
        return focalTopic;
    }

    public void setFocalTopic(String focalTopic) {
        this.focalTopic = focalTopic;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public List<Student> getMembers() {
        return Collections.unmodifiableList(members);
    }

    public int getMemberCount() {
        return members.size();
    }

    @Override
    public String toString() {
        return String.format("Team '%s' (%s) | %d members | Diverse: %s",
                name, focalTopic, members.size(), hasCrossBorderDiversity());
    }
}
