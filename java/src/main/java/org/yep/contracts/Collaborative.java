package org.yep.contracts;

/**
 * Interface contract for cross-border teamwork entities (Level 2 Impact Projects).
 */
public interface Collaborative {
    /**
     * Assigns a youth participant or entity to a virtual exchange team.
     * @param teamId Unique identifier for the team.
     * @param teamName Human readable team title.
     */
    void assignVirtualExchangeTeam(String teamId, String teamName);

    /**
     * Calculates collaborative impact contribution score.
     * @return numeric score reflecting team contribution.
     */
    double calculateImpactScore();

    /**
     * Submits a project milestone deliverable.
     * @param milestoneId Identifier of milestone.
     * @param deliverableUrl Resource URL.
     * @return true if successfully recorded.
     */
    boolean submitMilestone(String milestoneId, String deliverableUrl);
}
