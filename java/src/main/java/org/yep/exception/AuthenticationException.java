package org.yep.exception;

/**
 * Custom Exception for credential and authentication validation failures
 */
public class AuthenticationException extends Exception {
    private final String attemptedIdentifier;

    public AuthenticationException(String message, String attemptedIdentifier) {
        super(String.format("%s [Identifier: %s]", message, attemptedIdentifier));
        this.attemptedIdentifier = attemptedIdentifier;
    }

    public String getAttemptedIdentifier() {
        return attemptedIdentifier;
    }
}
