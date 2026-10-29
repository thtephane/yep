package org.yep.contracts;

/**
 * Interface for assessable components (quizzes, project milestone reports).
 */
public interface Assessable {
    double calculateGradeScore();
    boolean hasPassed(double passingGrade);
    String getAssessmentFeedback();
}
