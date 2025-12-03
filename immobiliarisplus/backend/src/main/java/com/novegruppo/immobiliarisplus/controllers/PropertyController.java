package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
//import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyFrontendDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
//import com.novegruppo.immobiliarisplus.mappers.PropertyFrontendMapper;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.OwnerService;
import com.novegruppo.immobiliarisplus.services.PropertyAddressService;
import com.novegruppo.immobiliarisplus.services.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final OwnerService ownerService;
    private final PropertyAddressService propertyAddressService;
    private final UserService userService;

    public PropertyController(PropertyService propertyService, OwnerService ownerService,
                            PropertyAddressService propertyAddressService, UserService userService) {
        this.propertyService = propertyService;
        this.ownerService = ownerService;
        this.propertyAddressService = propertyAddressService;
        this.userService = userService;
    }

    @GetMapping
    public List<PropertyDTO> list() {
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN and AGENT can access all properties
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return propertyService.findAll();
        }
        // OWNER vede solo le proprie proprietà
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null) {
                    Integer ownerId = current.ownerId();
                    return propertyService.findAll().stream().filter(p -> ownerId.equals(p.ownerId())).toList();
                }
            }
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public PropertyDTO getById(@PathVariable Integer id) {
        PropertyDTO dto = propertyService.findById(id);
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
                if (current != null && current.ownerId() != null && current.ownerId().equals(dto.ownerId())) {
                    return dto;
                }
            }
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> create(@RequestBody PropertyCreateDTO dto) {
        // only ADMIN e AGENT can create properties
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name()) && !SecurityUtil.hasRole(UserRole.AGENT.name())) {
            return ResponseEntity.status(403).build();
        }
        PropertyDTO created = propertyService.create(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyDTO update(@PathVariable Integer id, @RequestBody PropertyUpdateDTO dto) {
        PropertyDTO existing = propertyService.findById(id);
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN and AGENT can modify all properties
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return propertyService.update(id, dto);
        }
        // OWNER can modify only their own properties
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null && current.ownerId().equals(existing.ownerId())) {
                    return propertyService.update(id, dto);
                }
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        // only ADMIN can delete properties
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        propertyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Unnecessary endpoint for frontend nested payload structure, commented out for now.
//    @GetMapping("/frontend/{id}")
//    public ResponseEntity<PropertyFrontendDTO> getFrontendById(@PathVariable Integer id) {
//        PropertyDTO property;
//        try {
//            property = propertyService.findById(id);
//        } catch (RuntimeException ex) {
//            return ResponseEntity.notFound().build();
//        }
//
//        // verify access permissions
//        if (!SecurityUtil.isAuthenticated()) {
//            return ResponseEntity.status(403).build();
//        }
//        Set<String> roles = SecurityUtil.getRoles();
//        boolean hasAccess = false;
//        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
//            hasAccess = true;
//        } else if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
//            String email = SecurityUtil.getUsername();
//            if (email != null) {
//                UserDTO current = userService.findAll().stream()
//                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
//                        .findFirst().orElse(null);
//                if (current != null && current.ownerId() != null && current.ownerId().equals(property.ownerId())) {
//                    hasAccess = true;
//                }
//            }
//        }
//
//        if (!hasAccess) {
//            return ResponseEntity.status(403).build();
//        }
//
//        OwnerDTO owner = null;
//        PropertyAddressDTO address = null;
//        try {
//            address = propertyAddressService.findById(id);
//        } catch (RuntimeException ignored) {
//        }
//
//        PropertyFrontendDTO frontend = PropertyFrontendMapper.toFrontendDTO(property, owner, address);
//        return ResponseEntity.ok(frontend);
//    }
}
