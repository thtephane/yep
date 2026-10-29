package org.yep.exception;

/**
 * Custom Exception demonstrating domain-specific checked exception handling in OOP
 */
public class EnrollmentException extends Exception {
    private final String courseId;
    private final String studentId;

    public EnrollmentException(String message, String courseId, String studentId) {
        super(String.format("%s [Course: %s, Student: %s]", message, courseId, studentId));
        this.courseId = courseId;
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getStudentId() {
        return studentId;
    }
}
