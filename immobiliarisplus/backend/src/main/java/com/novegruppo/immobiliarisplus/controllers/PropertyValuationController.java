package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import com.novegruppo.immobiliarisplus.services.UserService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.EmployeeService;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/valuations")
public class PropertyValuationController {

    private final PropertyValuationService propertyValuationService;
    private final UserService userService;
    private final PropertyService propertyService;
    private final EmployeeService employeeService;

    public PropertyValuationController(PropertyValuationService propertyValuationService,
                                       UserService userService,
                                       PropertyService propertyService,
                                       EmployeeService employeeService) {
        this.propertyValuationService = propertyValuationService;
        this.userService = userService;
        this.propertyService = propertyService;
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<PropertyValuationDTO> list() {
        List<PropertyValuationDTO> all = propertyValuationService.findAll();
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name())) {
            return all;
        }
        String email = SecurityUtil.getUsername();
        if (email == null || email.isBlank()) return List.of();
        UserDTO current = userService.findAll().stream()
                .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
        if (current == null) return List.of();
        if (roles.contains("ROLE_" + UserRole.AGENT.name())) {
            Integer employeeId = employeeService.findAll().stream()
                    .filter(e -> e.userId() != null && e.userId().equals(current.id()))
                    .map(com.novegruppo.immobiliarisplus.dtos.EmployeeDTO::id)
                    .findFirst().orElse(null);
            if (employeeId == null) return List.of();
            return all.stream().filter(v -> employeeId.equals(v.employeeId())).toList();
        }
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            Integer ownerId = current.ownerId();
            if (ownerId == null) return List.of();
            List<Integer> myPropertyIds = propertyService.findAll().stream()
                    .filter(p -> ownerId.equals(p.ownerId()))
                    .map(PropertyDTO::id)
                    .toList();
            return all.stream().filter(v -> myPropertyIds.contains(v.propertyId())).toList();
        }
        return List.of();
    }

    @GetMapping("/{id}")
    public PropertyValuationDTO getById(@PathVariable Integer id) {
        PropertyValuationDTO dto = propertyValuationService.findById(id);
        if (!SecurityUtil.isAuthenticated()) {
            return null;
        }
        Set<String> roles = SecurityUtil.getRoles();
        if (roles.contains("ROLE_" + UserRole.ADMIN.name())) {
            return dto;
        }
        String email = SecurityUtil.getUsername();
        if (email == null || email.isBlank()) return null;
        UserDTO current = userService.findAll().stream()
                .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                .findFirst()
                .orElse(null);
        if (current == null) return null;
        if (roles.contains("ROLE_" + UserRole.AGENT.name())) {
            Integer employeeId = employeeService.findAll().stream()
                    .filter(e -> e.userId() != null && e.userId().equals(current.id()))
                    .map(com.novegruppo.immobiliarisplus.dtos.EmployeeDTO::id)
                    .findFirst().orElse(null);
            if (employeeId != null && employeeId.equals(dto.employeeId())) {
                return dto;
            }
            return null;
        }
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            Integer ownerId = current.ownerId();
            if (ownerId != null) {
                PropertyDTO property = propertyService.findById(dto.propertyId());
                if (ownerId.equals(property.ownerId())) {
                    return dto;
                }
            }
            return null;
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<PropertyValuationDTO> create(@RequestBody PropertyValuationDTO dto) {
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        PropertyValuationDTO created = propertyValuationService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyValuationDTO update(@PathVariable Integer id, @RequestBody PropertyValuationDTO dto) {
        if (SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return propertyValuationService.update(id, dto);
        }
        if (SecurityUtil.hasRole(UserRole.AGENT.name())) {
            PropertyValuationDTO existing = propertyValuationService.findById(id);
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream().filter(u -> u.email() != null && u.email().equalsIgnoreCase(email)).findFirst().orElse(null);
                if (current != null) {
                    Integer employeeId = employeeService.findAll().stream()
                            .filter(e -> e.userId() != null && e.userId().equals(current.id()))
                            .map(com.novegruppo.immobiliarisplus.dtos.EmployeeDTO::id)
                            .findFirst().orElse(null);
                    if (employeeId != null && employeeId.equals(existing.employeeId())) {
                        return propertyValuationService.update(id, dto);
                    }
                }
            }
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        propertyValuationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateValuation(@RequestBody PropertyValuationRequestDTO request) {
        try {
            PropertyValuationResultDTO result = propertyValuationService.calculateAndSave(request);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
