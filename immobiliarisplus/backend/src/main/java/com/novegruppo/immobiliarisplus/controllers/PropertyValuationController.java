package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyAddress;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyAddressRepository;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import com.novegruppo.immobiliarisplus.services.EmployeeService;import com.novegruppo.immobiliarisplus.services.UserService;
import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import com.novegruppo.immobiliarisplus.security.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/valuations")
public class PropertyValuationController {

    private final PropertyValuationService service;
    private final PropertyRepository propertyRepository;
    private final PropertyAddressRepository propertyAddressRepository;
    private final EmployeeService employeeService;
    private final UserService userService;

    public PropertyValuationController(PropertyValuationService service,
                                       PropertyRepository propertyRepository,
                                       PropertyAddressRepository propertyAddressRepository,
                                       EmployeeService employeeService,
                                       UserService userService) {
        this.service = service;
        this.propertyRepository = propertyRepository;
        this.propertyAddressRepository = propertyAddressRepository;
        this.employeeService = employeeService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<PropertyValuationDTO>> list() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyValuationDTO> get(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/calculate")
    public ResponseEntity<PropertyValuationResultDTO> calculate(@RequestBody PropertyValuationRequestDTO request) {
        PropertyValuationResultDTO result = service.calculateAndSave(request);
        return ResponseEntity.ok(result);
    }

    // Endpoint dashboard: LISTA minimale conforme al frontend (sostituisce la precedente versione completa)
    @GetMapping("/dashboard")
    public ResponseEntity<List<Map<String, Object>>> listForDashboard() {
        List<PropertyValuationDTO> all = service.findAll();
        List<PropertyValuationDTO> filtered;
        if (SecurityUtil.hasRole("ADMIN")) {
            filtered = all;
        } else if (SecurityUtil.hasRole("AGENT")) {
            String username = SecurityUtil.getUsername();
            if (username == null) {
                filtered = List.of();
            } else {
                UserDTO user = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(username))
                        .findFirst().orElse(null);
                if (user == null) {
                    filtered = List.of();
                } else {
                    Integer employeeId = employeeService.findAll().stream()
                            .filter(e -> e.userId() != null && e.userId().equals(user.id()))
                            .map(EmployeeDTO::id)
                            .findFirst().orElse(null);
                    if (employeeId == null) {
                        filtered = List.of();
                    } else {
                        filtered = all.stream().filter(v -> employeeId.equals(v.employeeId())).toList();
                    }
                }
            }
        } else {
            filtered = List.of();
        }

        List<Map<String, Object>> payload = filtered.stream().map(v -> {
            Map<String, Object> out = new HashMap<>();
            out.put("id", v.id());

            Property property = v.propertyId() != null ? propertyRepository.findById(v.propertyId()).orElse(null) : null;
            PropertyAddress address = v.propertyId() != null ? propertyAddressRepository.findById(v.propertyId()).orElse(null) : null;

            Map<String, Object> propertyMap = new HashMap<>();
            propertyMap.put("address", address != null ? address.getStreet() + ", " + address.getCity() : null);
            propertyMap.put("sizeMq", property != null ? property.getSizeMq() : null);
            out.put("property", propertyMap);

            String assignedAgentName = null;
            if (v.employeeId() != null) {
                try {
                    EmployeeDTO employee = employeeService.findById(v.employeeId());
                    assignedAgentName = employee.name() + " " + employee.surname();
                } catch (Exception ignored) {}
            }
            out.put("assignedAgent", assignedAgentName);
            out.put("valuationFinal", v.estimatedPriceMax());
            out.put("status", v.status() != null ? v.status() : ValuationStatus.NEW);
            return out;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(payload);
    }

    // Dettaglio completo valutazione by id
    @GetMapping("/dashboard/{id}")
    public ResponseEntity<Map<String, Object>> getDashboardDetail(@PathVariable Integer id) {
        PropertyValuationDTO v = service.findById(id);
        if (SecurityUtil.hasRole("AGENT") && v.employeeId() == null) {
            return ResponseEntity.status(403).build();
        }
        Map<String, Object> out = new HashMap<>();
        out.put("id", v.id());
        Property property = v.propertyId() != null ? propertyRepository.findById(v.propertyId()).orElse(null) : null;
        PropertyAddress address = v.propertyId() != null ? propertyAddressRepository.findById(v.propertyId()).orElse(null) : null;
        Owner owner = property != null ? property.getOwner() : null;
        Map<String, Object> propertyMap = new HashMap<>();
        propertyMap.put("address", address != null ? address.getStreet() + ", " + address.getCity() : null);
        propertyMap.put("propertyType", property != null ? property.getType() : null);
        propertyMap.put("condition", property != null ? property.getStatus() : null);
        propertyMap.put("sizeMq", property != null ? property.getSizeMq() : null);
        out.put("property", propertyMap);
        Map<String, Object> details = new HashMap<>();
        if (property != null) {
            details.put("rooms", property.getRooms());
            details.put("bathrooms", property.getBathrooms());
            details.put("floor", property.getFloors());
        }
        out.put("details", details);
        Map<String, Object> contact = new HashMap<>();
        if (owner != null) {
            contact.put("name", owner.getName());
            contact.put("surname", owner.getSurname());
            contact.put("email", owner.getEmail());
            contact.put("phone", owner.getPhone());
        }
        out.put("contact", contact);
        out.put("valuationRange", (v.estimatedPriceMin() != null && v.estimatedPriceMax() != null) ? String.format("%.0f - %.0f €", v.estimatedPriceMin(), v.estimatedPriceMax()) : null);
        out.put("valuationFinal", v.estimatedPriceMax());
        out.put("status", v.status() != null ? v.status() : ValuationStatus.NEW);
        String agentName = null;
        if (v.employeeId() != null) {
            try {
                EmployeeDTO e = employeeService.findById(v.employeeId());
                agentName = e.name() + " " + e.surname();
            } catch (Exception ignored) {}
        }
        out.put("assignedAgent", agentName);
        out.put("documents", new ArrayList<>());
        return ResponseEntity.ok(out);
    }

    // Update valutazione (ADMIN + AGENT se assegnata) - aggiorna uno o più campi
    @PatchMapping("/dashboard/{id}")
    public ResponseEntity<PropertyValuationDTO> updateValuation(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        PropertyValuationDTO current = service.findById(id);

        // Controllo permessi
        if (!SecurityUtil.hasRole("ADMIN")) {
            if (!(SecurityUtil.hasRole("AGENT") && current.employeeId() != null)) {
                return ResponseEntity.status(403).build();
            }
        }

        // Aggiorna i campi forniti
        if (updates.containsKey("status")) {
            String statusStr = (String) updates.get("status");
            ValuationStatus status = ValuationStatus.valueOf(statusStr);
            current = service.updateStatus(id, status);
        }

        if (updates.containsKey("notes")) {
            String notes = (String) updates.get("notes");
            current = service.updateNotes(id, notes);
        }

        return ResponseEntity.ok(current);
    }

    // Assegna agente (solo ADMIN)
    @PutMapping("/dashboard/{id}/assign/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PropertyValuationDTO> assignAgent(@PathVariable Integer id, @PathVariable Integer employeeId) {
        return ResponseEntity.ok(service.assignEmployee(id, employeeId));
    }

    // Delete valutazione (solo ADMIN)
    @DeleteMapping("/dashboard/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDashboard(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
