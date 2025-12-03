package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.OwnerService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    private final OwnerService ownerService;
    private final PropertyService propertyService;
    private final UserService userService;

    public OwnerController(OwnerService ownerService, PropertyService propertyService, UserService userService) {
        this.ownerService = ownerService;
        this.propertyService = propertyService;
        this.userService = userService;
    }

    // complete list of owners with role-based access control
    @GetMapping
    public List<OwnerDTO> list() {
        List<OwnerDTO> all = ownerService.findAll();
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN e AGENT vedono tutti
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return all;
        }
        // OWNER vede solo se stesso
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null) {
                    return all.stream().filter(o -> o.id().equals(current.ownerId())).toList();
                }
            }
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public OwnerDTO getById(@PathVariable Integer id) {
        OwnerDTO dto = ownerService.findById(id);
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return dto;
        }
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null && current.ownerId().equals(id)) {
                    return dto;
                }
            }
        }
        return null;
    }

    // owner creation
    @PostMapping
    public ResponseEntity<OwnerDTO> create(@RequestBody OwnerDTO dto) {
        // Solo ADMIN e AGENT possono creare owners manualmente
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name()) && !SecurityUtil.hasRole(UserRole.AGENT.name())) {
            return ResponseEntity.status(403).build();
        }
        OwnerDTO created = ownerService.create(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // update owner
    @PutMapping("/{id}")
    public OwnerDTO update(@PathVariable Integer id, @RequestBody OwnerDTO dto) {
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN e AGENT possono modificare qualsiasi owner
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return ownerService.update(id, dto);
        }
        // OWNER can modify only their own owner record
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null && current.ownerId().equals(id)) {
                    return ownerService.update(id, dto);
                }
            }
        }
        return null;
    }

    // delete owner
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        // Solo ADMIN può eliminare
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // owner's properties with role-based access control
    @GetMapping("/{id}/properties")
    public List<PropertyDTO> listPropertiesByOwner(@PathVariable Integer id) {
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN e AGENT vedono tutte le proprietà di qualsiasi owner
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return propertyService.findAll()
                    .stream()
                    .filter(p -> p.ownerId().equals(id))
                    .toList();
        }

        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null && current.ownerId().equals(id)) {
                    return propertyService.findAll()
                            .stream()
                            .filter(p -> p.ownerId().equals(id))
                            .toList();
                }
            }
        }
        return List.of();
    }
}
