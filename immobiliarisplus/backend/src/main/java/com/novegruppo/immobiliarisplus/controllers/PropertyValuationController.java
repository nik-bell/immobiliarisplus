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

    // Endpoint for calculating and saving a new property, owner and address of valuation
    @PostMapping("/calculate")
    public ResponseEntity<PropertyValuationResultDTO> calculate(@RequestBody PropertyValuationRequestDTO request) {
        PropertyValuationResultDTO result = service.calculateAndSave(request);
        return ResponseEntity.ok(result);
    }

    // Endpoint dashboard: minimal list of valuations with filtering based on role
    @GetMapping("/dashboard")
    public ResponseEntity<List<Map<String, Object>>> listForDashboard() {
        List<PropertyValuationDTO> all = service.findAll();
        List<PropertyValuationDTO> filtered;
        if (SecurityUtil.hasRole("ADMIN")) { // ADMIN see all valuations
            filtered = all;
        } else if (SecurityUtil.hasRole("AGENT")) { // AGENT see only their valuations
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
                } catch (Exception ignored) {
                }
            }
            out.put("assignedAgent", assignedAgentName);
            out.put("valuationFinal", v.valuationFinal());
            out.put("status", v.status() != null ? v.status() : ValuationStatus.NOT_ASSIGNED); // Default status if null
            return out;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(payload);
    }

    // Complete detail of a valuation for dashboard
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
        out.put("valuationFinal", v.valuationFinal());
        out.put("status", v.status() != null ? v.status() : ValuationStatus.NOT_ASSIGNED);
        out.put("notes", v.notes());
        String agentName = null;
        if (v.employeeId() != null) {
            try {
                EmployeeDTO e = employeeService.findById(v.employeeId());
                agentName = e.name() + " " + e.surname();
            } catch (Exception ignored) {
            }
        }
        out.put("assignedAgent", agentName);
        out.put("documents", new ArrayList<>());
        return ResponseEntity.ok(out);
    }

    // valuation update endpoint for dashboard: can update status, notes, valuationFinal
    @PatchMapping(value = "/dashboard/{id}", consumes = "application/json")
    public ResponseEntity<?> updateValuation(@PathVariable Integer id, @RequestBody(required = false) Map<String, Object> updates) {
        if (updates == null || updates.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Request body JSON mancante o vuoto"));
        }

        PropertyValuationDTO current = service.findById(id);
        // ADMIN can update any valuation
        // AGENT can update only their assigned valuations
        if (!SecurityUtil.hasRole("ADMIN")) {
            if (SecurityUtil.hasRole("AGENT")) {
                String username = SecurityUtil.getUsername();
                if (username == null) {
                    return ResponseEntity.status(403).body(Map.of("error", "Non autorizzato"));
                }
                UserDTO user = userService.findAll().stream()
                        .filter(u -> u.email() != null && u.email().equalsIgnoreCase(username))
                        .findFirst().orElse(null);
                if (user == null) {
                    return ResponseEntity.status(403).body(Map.of("error", "Utente non trovato"));
                }
                Integer requesterEmployeeId = employeeService.findAll().stream()
                        .filter(e -> e.userId() != null && e.userId().equals(user.id()))
                        .map(EmployeeDTO::id)
                        .findFirst().orElse(null);
                if (requesterEmployeeId == null || current.employeeId() == null || !requesterEmployeeId.equals(current.employeeId())) {
                    return ResponseEntity.status(403).body(Map.of("error", "Non autorizzato: la valutazione non è assegnata a te"));
                }
            } else {
                return ResponseEntity.status(403).body(Map.of("error", "Non autorizzato"));
            }
        }

        try {
            // update status
            if (updates.containsKey("status")) {
                Object raw = updates.get("status");
                if (raw == null) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Campo 'status' nullo"));
                }
                String statusStr = String.valueOf(raw).trim();
                if (statusStr.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Campo 'status' vuoto"));
                }
                try {
                    ValuationStatus status = ValuationStatus.valueOf(statusStr.toUpperCase());
                    service.updateStatus(id, status);
                } catch (IllegalArgumentException ex) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "error", "Valore 'status' non valido",
                            "allowed", List.of("NEW","IN_PROGRESS","AWAITING_CLIENT_RESPONSE","CONFIRMED","REJECTED","NOT_ASSIGNED")
                    ));
                }
            }

            // update notes
            if (updates.containsKey("notes")) {
                Object raw = updates.get("notes");
                String notes = raw != null ? String.valueOf(raw) : null;
                service.updateNotes(id, notes);
            }

            // update valuationFinal
            if (updates.containsKey("valuationFinal")) {
                Object raw = updates.get("valuationFinal");
                if (raw == null) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Campo 'valuationFinal' nullo"));
                }
                try {
                    Double finalPrice;
                    if (raw instanceof Number) {
                        finalPrice = ((Number) raw).doubleValue();
                    } else {
                        String s = String.valueOf(raw).replace(",", ".").trim();
                        if (s.isEmpty()) {
                            return ResponseEntity.badRequest().body(Map.of("error", "Campo 'valuationFinal' vuoto"));
                        }
                        finalPrice = Double.parseDouble(s);
                    }
                    if (finalPrice <= 0) {
                        return ResponseEntity.badRequest().body(Map.of("error", "'valuationFinal' deve essere > 0"));
                    }
                    service.updateFinalPrice(id, finalPrice);
                } catch (NumberFormatException nfe) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Campo 'valuationFinal' non numerico"));
                }
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Errore durante l'aggiornamento",
                    "message", e.getMessage()
            ));
        }

        // Retrieve updated valuation
        PropertyValuationDTO updated = service.findById(id);

        // Build response with full details to see changes
        Map<String, Object> response = new HashMap<>();
        response.put("id", updated.id());

        Property property = updated.propertyId() != null ? propertyRepository.findById(updated.propertyId()).orElse(null) : null;
        PropertyAddress address = updated.propertyId() != null ? propertyAddressRepository.findById(updated.propertyId()).orElse(null) : null;
        Owner owner = property != null ? property.getOwner() : null;

        Map<String, Object> propertyMap = new HashMap<>();
        propertyMap.put("address", address != null ? address.getStreet() + ", " + address.getCity() : null);
        propertyMap.put("propertyType", property != null ? property.getType() : null);
        propertyMap.put("condition", property != null ? property.getStatus() : null);
        propertyMap.put("sizeMq", property != null ? property.getSizeMq() : null);
        response.put("property", propertyMap);

        Map<String, Object> details = new HashMap<>();
        if (property != null) {
            details.put("rooms", property.getRooms());
            details.put("bathrooms", property.getBathrooms());
            details.put("floor", property.getFloors());
        }
        response.put("details", details);

        Map<String, Object> contact = new HashMap<>();
        if (owner != null) {
            contact.put("name", owner.getName());
            contact.put("surname", owner.getSurname());
            contact.put("email", owner.getEmail());
            contact.put("phone", owner.getPhone());
        }
        response.put("contact", contact);

        response.put("valuationRange", (updated.estimatedPriceMin() != null && updated.estimatedPriceMax() != null)
            ? String.format("%.0f - %.0f €", updated.estimatedPriceMin(), updated.estimatedPriceMax()) : null);
        response.put("valuationFinal", updated.valuationFinal());
        response.put("status", updated.status() != null ? updated.status() : ValuationStatus.NOT_ASSIGNED);
        response.put("notes", updated.notes());

        String agentName = null;
        if (updated.employeeId() != null) {
            try {
                EmployeeDTO e = employeeService.findById(updated.employeeId());
                agentName = e.name() + " " + e.surname();
            } catch (Exception ignored) {
            }
        }
        response.put("assignedAgent", agentName);
        response.put("documents", new ArrayList<>());

        return ResponseEntity.ok(response);
    }

    // Assign agent (only ADMIN)
    @PutMapping("/dashboard/{id}/assign/{employeeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PropertyValuationDTO> assignAgent(@PathVariable Integer id, @PathVariable Integer employeeId) {
        return ResponseEntity.ok(service.assignEmployee(id, employeeId));
    }

    // Delete valuation (only ADMIN)
    @DeleteMapping("/dashboard/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDashboard(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}