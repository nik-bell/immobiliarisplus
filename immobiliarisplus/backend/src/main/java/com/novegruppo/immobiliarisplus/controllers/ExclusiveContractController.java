package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.ExclusiveContractDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import com.novegruppo.immobiliarisplus.services.ExclusiveContractService;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/exclusive-contracts")
public class ExclusiveContractController {

    private final ExclusiveContractService exclusiveContractService;
    private final PropertyService propertyService;
    private final UserService userService;

    public ExclusiveContractController(ExclusiveContractService exclusiveContractService,
                                      PropertyService propertyService, UserService userService) {
        this.exclusiveContractService = exclusiveContractService;
        this.propertyService = propertyService;
        this.userService = userService;
    }

    @GetMapping
    public List<ExclusiveContractDTO> list() {
        List<ExclusiveContractDTO> all = exclusiveContractService.findAll();
        if (!SecurityUtil.isAuthenticated()) {
            return List.of();
        }
        Set<String> roles = SecurityUtil.getRoles();
        // ADMIN e AGENT vedono tutti i contratti
        if (roles.contains("ROLE_" + UserRole.ADMIN.name()) || roles.contains("ROLE_" + UserRole.AGENT.name())) {
            return all;
        }
        // OWNER vede solo contratti delle proprie proprietà
        if (roles.contains("ROLE_" + UserRole.OWNER.name())) {
            String email = SecurityUtil.getUsername();
            if (email != null) {
                UserDTO current = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(email))
                        .findFirst().orElse(null);
                if (current != null && current.ownerId() != null) {
                    Integer ownerId = current.ownerId();
                    return all.stream().filter(contract -> {
                        try {
                            PropertyDTO prop = propertyService.findById(contract.propertyId());
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
    public ExclusiveContractDTO getById(@PathVariable Integer id) {
        ExclusiveContractDTO dto = exclusiveContractService.findById(id);
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
                if (current != null && current.ownerId() != null) {
                    try {
                        PropertyDTO prop = propertyService.findById(dto.propertyId());
                        if (current.ownerId().equals(prop.ownerId())) {
                            return dto;
                        }
                    } catch (Exception e) {
                        return null;
                    }
                }
            }
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<ExclusiveContractDTO> create(@RequestBody ExclusiveContractDTO dto) {
        // Solo ADMIN e AGENT possono creare contratti
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name()) && !SecurityUtil.hasRole(UserRole.AGENT.name())) {
            return ResponseEntity.status(403).build();
        }
        ExclusiveContractDTO created = exclusiveContractService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ExclusiveContractDTO update(@PathVariable Integer id, @RequestBody ExclusiveContractDTO dto) {
        // Solo ADMIN e AGENT possono modificare contratti
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name()) && !SecurityUtil.hasRole(UserRole.AGENT.name())) {
            return null;
        }
        return exclusiveContractService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        // Solo ADMIN può eliminare contratti
        if (!SecurityUtil.hasRole(UserRole.ADMIN.name())) {
            return ResponseEntity.status(403).build();
        }
        exclusiveContractService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
