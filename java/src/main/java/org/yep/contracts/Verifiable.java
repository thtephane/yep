package org.yep.contracts;

/**
 * Interface defining credential verification contracts.
 * Applied to participants completing Level 1 & Level 2 Virtual Exchange modules.
 */
public interface Verifiable {
    /**
     * Checks if participant satisfies curriculum standards (>=70% completion and passing assessments).
     * @return true if eligible for official digital credential.
     */
    boolean verifyEligibilityForCertificate();

    /**
     * Generates a cryptographic verification token for the issued certificate.
     * @return Unique certificate hash.
     */
    String generateDigitalCertificateCode();

    /**
     * Returns the verification status of the learner.
     * @return Status string.
     */
    String getVerificationStatus();
}
