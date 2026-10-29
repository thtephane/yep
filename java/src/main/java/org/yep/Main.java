package org.yep;

import org.yep.contracts.Assessable;
import org.yep.contracts.Verifiable;
import org.yep.exception.EnrollmentException;
import org.yep.model.Administrator;
import org.yep.model.Course;
import org.yep.model.DigitalCertificate;
import org.yep.model.ImpactProject;
import org.yep.model.Lesson;
import org.yep.model.Mentor;
import org.yep.model.Student;
import org.yep.model.Team;
import org.yep.model.User;
import org.yep.service.YEPPlatformService;

import java.util.List;

/**
 * Main Executable Class: Demonstrates all OOP Principles
 *
 * 1. Encapsulation:
 *    - All domain models (User, Student, Course, Team) maintain private state and provide controlled access.
 * 2. Inheritance:
 *    - Student, Mentor, and Administrator all extend abstract User base class.
 * 3. Polymorphism:
 *    - YEPPlatformService processes lists of User objects via dynamic method dispatch (`displayRoleSummary()`).
 * 4. Abstraction:
 *    - Abstract class User and Interfaces (Verifiable, Collaborative, Assessable).
 * 5. Exception Handling:
 *    - Custom checked exception `EnrollmentException`.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("===============================================================");
        System.out.println("  YouthEmpowermentProject (YEP) - Java OOP System Demonstration");
        System.out.println("===============================================================\n");

        YEPPlatformService service = new YEPPlatformService();

        // 1. Instantiating Subclasses (Inheritance & Encapsulation)
        Student amina = new Student("u-student", "Amina N.", "amina@example.com", "Uganda", "/avatars/amina.png", 24, 7);
        Student brian = new Student("u-student-2", "Brian O.", "brian@example.ke", "Kenya", "/avatars/brian.png", 18, 5);
        Mentor daniel = new Mentor("u-mentor", "Daniel K.", "daniel@yep.org", "Uganda", "/avatars/daniel.png", "Digital Literacy & Web");
        Administrator nadia = new Administrator("u-admin", "Nadia A.", "nadia@yep.org", "Uganda", "/avatars/nadia.png", "Operations & Governance");

        // 2. Registering into the service
        service.registerUser(amina);
        service.registerUser(brian);
        service.registerUser(daniel);
        service.registerUser(nadia);

        // 3. Creating Courses and Lessons (Composition)
        Course digitalLit = new Course("c1", "Digital Literacy", "Digital Skills", daniel.getFullName());
        digitalLit.addLesson(new Lesson("l1", "Foundations of Online Safety", 45, "Password managers and 2FA"));
        digitalLit.addLesson(new Lesson("l2", "Critical Digital Information", 60, "Evaluating digital sources"));
        digitalLit.addLesson(new Lesson("l3", "Intro to Web Technologies", 75, "HTML and internet architecture"));

        service.registerCourse(digitalLit);

        // 4. Enrollment & Exception Handling Demonstration
        try {
            System.out.println("[OOP Demo] Enrolling Amina into Digital Literacy...");
            service.enrollStudent(amina.getId(), digitalLit.getId());
            System.out.println("-> Enrollment successful!");

            // Attempt invalid enrollment to showcase custom exception handling
            System.out.println("\n[OOP Demo] Attempting invalid enrollment for nonexistent course...");
            service.enrollStudent(amina.getId(), "non-existent-course-id");
        } catch (EnrollmentException ex) {
            System.out.println("-> Caught expected checked exception: " + ex.getMessage());
        }

        // 5. Cross-Border Virtual Exchange Team (Collaboration contract)
        System.out.println("\n[OOP Demo] Forming Cross-Border Virtual Exchange Team...");
        Team communityTeam = service.createTeam("t-comm", "Community Connect East Africa", "Community Digital Access", daniel.getId());
        service.assignStudentToTeam(communityTeam.getId(), amina.getId());
        service.assignStudentToTeam(communityTeam.getId(), brian.getId());

        System.out.println(communityTeam);
        System.out.println("-> Meets cross-border diversity criteria: " + communityTeam.hasCrossBorderDiversity());

        // 6. Impact Project Assessment (Assessable contract)
        System.out.println("\n[OOP Demo] Assessing Impact Project...");
        ImpactProject project = new ImpactProject("p1", "Community Connect Portal", "Digital Inclusion", communityTeam.getId());
        project.submitArtifact("Needs_Assessment_Survey_Kampala.pdf");
        project.submitArtifact("Prototype_Wireframes.pdf");
        project.updateProgress(85, "Field Testing with 50 Local Youths", 92);

        Assessable assessableProject = project; // Polymorphic reference to interface
        System.out.println("-> " + assessableProject.getAssessmentSummary());
        System.out.println("-> Project passed milestone: " + assessableProject.isPassed());

        // 7. Verifiable Digital Credential Issuance
        System.out.println("\n[OOP Demo] Issuing Verifiable Digital Certificate...");
        DigitalCertificate cert = service.issueCertificate(amina.getId(), "Youth Digital Empowerment - Level 1");
        Verifiable verifiableCert = cert;
        System.out.println(cert);
        System.out.println("-> Verification Hash: " + verifiableCert.getVerificationHash());
        System.out.println("-> Authenticity Confirmed: " + verifiableCert.verifyIdentity());

        // 8. Polymorphic User Hierarchy Reporting
        System.out.println("\n[OOP Demo] Generating Polymorphic User Audit Trail:");
        List<String> audit = service.generateAuditReport();
        for (String line : audit) {
            System.out.println(line);
        }

        System.out.println("\n===============================================================");
        System.out.println("  Java OOP Demonstration Completed Successfully!");
        System.out.println("===============================================================");
    }
}
