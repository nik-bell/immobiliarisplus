package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.PropertyAddressService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/property-addresses")
public class PropertyAddressController {

    private final PropertyAddressService propertyAddressService;
    private final PropertyService propertyService;
    private final UserService userService;

    public PropertyAddressController(PropertyAddressService propertyAddressService, PropertyService propertyService, UserService userService) {
        this.propertyAddressService = propertyAddressService;
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
    public List<PropertyAddressDTO> list() {
        List<PropertyAddressDTO> all = propertyAddressService.findAll();
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
                    return all.stream().filter(addr -> {
                        try {
                            PropertyDTO prop = propertyService.findById(addr.propertyId());
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
    public PropertyAddressDTO getById(@PathVariable Integer id) {
        PropertyAddressDTO dto = propertyAddressService.findById(id);
        if (!canAccessProperty(dto.propertyId())) {
            return null;
        }
        return dto;
    }

    @PostMapping
    public ResponseEntity<PropertyAddressDTO> create(@RequestBody PropertyAddressDTO dto) {
        if (!canAccessProperty(dto.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        PropertyAddressDTO created = propertyAddressService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.propertyId()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyAddressDTO update(@PathVariable Integer id, @RequestBody PropertyAddressDTO dto) {
        PropertyAddressDTO existing = propertyAddressService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return null;
        }
        return propertyAddressService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        PropertyAddressDTO existing = propertyAddressService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        propertyAddressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
