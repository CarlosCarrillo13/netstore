package com.net.store.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String SALES = "ROLE_SALES";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String MANAGER = "ROLE_MANAGER";

    public static final String BUSINESS = "ROLE_BUSINESS";

    public static final String CUSTOMER = "ROLE_CUSTOMER";

    private AuthoritiesConstants() {
    }
}
