package com.novegruppo.immobiliarisplus.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Set;
import java.util.stream.Collectors;

public final class SecurityUtil {

    private SecurityUtil() {}

    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public static boolean isAuthenticated() {
        Authentication auth = getAuthentication();
        return auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal());
    }

    public static Set<String> getRoles() {
        Authentication auth = getAuthentication();
        if (auth == null) return Set.of();
        return auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
    }

    public static boolean hasRole(String role) {
        return getRoles().contains("ROLE_" + role) || getRoles().contains(role);
    }

    public static String getUsername() {
        Authentication auth = getAuthentication();
        if (auth == null) return null;
        return auth.getName();
    }
}

