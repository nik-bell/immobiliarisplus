package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.PropertyDocsService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

// for future use

@RestController
@RequestMapping("/api/property-docs")
public class PropertyDocsController {

    private final PropertyDocsService propertyDocsService;
    private final PropertyService propertyService;
    private final UserService userService;

    public PropertyDocsController(PropertyDocsService propertyDocsService, PropertyService propertyService, UserService userService) {
        this.propertyDocsService = propertyDocsService;
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
    public List<PropertyDocsDTO> list() {
        List<PropertyDocsDTO> all = propertyDocsService.findAll();
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
                    return all.stream().filter(doc -> {
                        try {
                            PropertyDTO prop = propertyService.findById(doc.propertyId());
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
    public PropertyDocsDTO getById(@PathVariable Integer id) {
        PropertyDocsDTO dto = propertyDocsService.findById(id);
        if (!canAccessProperty(dto.propertyId())) {
            return null;
        }
        return dto;
    }

    @PostMapping
    public ResponseEntity<PropertyDocsDTO> create(@RequestBody PropertyDocsDTO dto) {
        if (!canAccessProperty(dto.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        PropertyDocsDTO created = propertyDocsService.create(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyDocsDTO update(@PathVariable Integer id, @RequestBody PropertyDocsDTO dto) {
        PropertyDocsDTO existing = propertyDocsService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return null;
        }
        return propertyDocsService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        PropertyDocsDTO existing = propertyDocsService.findById(id);
        if (!canAccessProperty(existing.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        propertyDocsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyDocsDTO> uploadDocument(
            @RequestParam("propertyId") Integer propertyId,
            @RequestParam("file") MultipartFile file
    ) {
        if (!canAccessProperty(propertyId)) {
            return ResponseEntity.status(403).build();
        }
        PropertyDocsDTO uploaded = propertyDocsService.upload(propertyId, file);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(uploaded.id())
                .toUri();
        return ResponseEntity.created(location).body(uploaded);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Object> downloadDocument(@PathVariable Integer id) {
        PropertyDocsDTO doc = propertyDocsService.findById(id);
        if (!canAccessProperty(doc.propertyId())) {
            return ResponseEntity.status(403).build();
        }
        var fileData = propertyDocsService.download(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ((PropertyDocsDTO) fileData).fileName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(((PropertyDocsDTO) fileData).bytes());
    }
}
