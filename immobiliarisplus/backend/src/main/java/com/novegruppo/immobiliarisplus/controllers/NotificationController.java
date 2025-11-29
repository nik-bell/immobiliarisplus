package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.NotificationDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.NotificationService;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    public NotificationController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @GetMapping
    public List<NotificationDTO> list() {
        List<NotificationDTO> all = notificationService.findAll();
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN vede tutte le notifiche
        if (roles.contains("ROLE_" + UserRole.ADMIN.name())) {
            return all;
        }
        // AGENT e OWNER vedono solo le proprie notifiche (per userId)
        String email = SecurityUtil.getUsername();
        if (email != null) {
            UserDTO current = userService.findAll().stream()
                    .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                    .findFirst().orElse(null);
            if (current != null) {
                return all.stream().filter(n -> current.id().equals(n.userId())).toList();
            }
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public NotificationDTO getById(@PathVariable Integer id) {
        NotificationDTO dto = notificationService.findById(id);
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name())) {
            return dto;
        }
        String email = SecurityUtil.getUsername();
        if (email != null) {
            UserDTO current = userService.findAll().stream()
                    .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                    .findFirst().orElse(null);
            if (current != null && current.id().equals(dto.userId())) {
                return dto;
            }
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<NotificationDTO> create(@RequestBody NotificationDTO dto) {
        // Solo ADMIN e AGENT possono creare notifiche
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name()) && !SecurityUtil.hasRole(UserRole.AGENT.name())) {
            return ResponseEntity.status(403).build();
        }
        NotificationDTO created = notificationService.create(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public NotificationDTO update(@PathVariable Integer id, @RequestBody NotificationDTO dto) {
        NotificationDTO existing = notificationService.findById(id);
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN può modificare qualsiasi notifica
        if (roles.contains("ROLE_" + UserRole.ADMIN.name())) {
            return notificationService.update(id, dto);
        }
        // Gli altri utenti possono modificare solo le proprie notifiche
        String email = SecurityUtil.getUsername();
        if (email != null) {
            UserDTO current = userService.findAll().stream()
                    .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                    .findFirst().orElse(null);
            if (current != null && current.id().equals(existing.userId())) {
                return notificationService.update(id, dto);
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        // Solo ADMIN può eliminare notifiche
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
