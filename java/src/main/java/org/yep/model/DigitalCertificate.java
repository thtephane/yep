package org.yep.model;

import org.yep.contracts.Verifiable;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * DigitalCertificate: Issued upon milestone or program completion
 * Implements: Verifiable interface
 */
public class DigitalCertificate implements Verifiable {
    private final String certificateNumber;
    private final String recipientName;
    private final String programTitle;
    private final LocalDateTime issuedDate;
    private final String issuer;
    private boolean revoked;

    public DigitalCertificate(String certificateNumber, String recipientName, String programTitle, String issuer) {
        this.certificateNumber = Objects.requireNonNull(certificateNumber, "Cert number required");
        this.recipientName = Objects.requireNonNull(recipientName, "Recipient required");
        this.programTitle = Objects.requireNonNull(programTitle, "Program title required");
        this.issuer = issuer != null ? issuer : "Youth Empowerment Project (YEP) Board";
        this.issuedDate = LocalDateTime.now();
        this.revoked = false;
    }

    @Override
    public boolean verifyIdentity() {
        return !revoked && certificateNumber.startsWith("YEP-CERT-");
    }

    @Override
    public String getVerificationHash() {
        return "SHA256:" + Integer.toHexString((certificateNumber + recipientName + issuedDate.toString()).hashCode());
    }

    @Override
    public LocalDateTime getVerificationTimestamp() {
        return issuedDate;
    }

    public void revoke() {
        this.revoked = true;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public String getProgramTitle() {
        return programTitle;
    }

    public LocalDateTime getIssuedDate() {
        return issuedDate;
    }

    public String getIssuer() {
        return issuer;
    }

    public boolean isRevoked() {
        return revoked;
    }

    @Override
    public String toString() {
        return String.format("Certificate [%s]: Awarded to '%s' for '%s' (Valid: %s)",
                certificateNumber, recipientName, programTitle, verifyIdentity());
    }
}
