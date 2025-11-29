package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyPhotoDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.PropertyPhotoService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/property-photos")
public class PropertyPhotoController {

    private final PropertyPhotoService propertyPhotoService;
    private final PropertyService propertyService;
    private final UserService userService;

    public PropertyPhotoController(PropertyPhotoService propertyPhotoService, PropertyService propertyService, UserService userService) {
        this.propertyPhotoService = propertyPhotoService;
        this.propertyService = propertyService;
        this.userService = userService;
    }

    private boolean canAccessProperty(Integer propertyId) {
        if (!SecurityUtil.isAuthenticated()) {
            return false;
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return true;
        }
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null) {
                    PropertyDTO property = propertyService.findById(propertyId);
                    return current.ownerId().equals(property.ownerId());
                }
            }
        }
        return false;
    }

    @GetMapping
    public List<PropertyPhotoDTO> list() {
        List<PropertyPhotoDTO> all = propertyPhotoService.findAll();
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return all;
        }
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null) {
                    Integer ownerId = current.ownerId();
                    return all.stream().filter(photo -> {
                        try {
                            PropertyDTO prop = propertyService.findById(photo.propertyId());
                            return ownerId.equals(prop.ownerId());
                        } catch (Exception e) {
                            return false;
                        }
                    }).toList();
                }
            }
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public PropertyPhotoDTO getById(@PathVariable Integer id) {
        PropertyPhotoDTO dto = propertyPhotoService.findById(id);
        if (!canAccessProperty(dto.propertyId())) {
            return null;
        }
        return dto;
    }

    @PostMapping
    public ResponseEntity<PropertyPhotoDTO> create(@RequestBody PropertyPhotoDTO dto) {
        if (!canAccessProperty(dto.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        PropertyPhotoDTO created = propertyPhotoService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyPhotoDTO update(@PathVariable Integer id, @RequestBody PropertyPhotoDTO dto) {
        PropertyPhotoDTO existing = propertyPhotoService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return null;
        }
        return propertyPhotoService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        PropertyPhotoDTO existing = propertyPhotoService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        propertyPhotoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
