package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import com.novegruppo.immobiliarisplus.services.EmployeeService;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@PreAuthorize("hasRole('ADMIN')")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final PropertyValuationService valuationService;

    public EmployeeController(EmployeeService employeeService, PropertyValuationService valuationService) {
        this.employeeService = employeeService;
        this.valuationService = valuationService;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        try {
            List<EmployeeDTO> employees = employeeService.findAll();
            System.out.println("✓ Employees fetched successfully: " + employees.size());
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            System.err.println("✗ Error in GET /api/employees:");
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of(
                "error", e.getMessage() != null ? e.getMessage() : "Unknown error",
                "type", e.getClass().getSimpleName()
            ));
        }
    }

    @GetMapping("/{id}")
    public EmployeeDTO getById(@PathVariable Integer id) {
        return employeeService.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody EmployeeDTO dto) {
        try {
            EmployeeDTO created = employeeService.create(dto);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            System.err.println("✗ Validation error in POST /api/employees: " + e.getMessage());
            return ResponseEntity.badRequest().body(java.util.Map.of(
                "error", e.getMessage(),
                "type", "ValidationError"
            ));
        } catch (Exception e) {
            System.err.println("✗ Error in POST /api/employees:");
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of(
                "error", e.getMessage() != null ? e.getMessage() : "Errore durante la creazione dell'employee",
                "type", e.getClass().getSimpleName()
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody EmployeeDTO dto) {
        try {
            EmployeeDTO updated = employeeService.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            System.err.println("✗ Validation error in PUT /api/employees/" + id + ": " + e.getMessage());
            return ResponseEntity.badRequest().body(java.util.Map.of(
                "error", e.getMessage(),
                "type", "ValidationError"
            ));
        } catch (Exception e) {
            System.err.println("✗ Error in PUT /api/employees/" + id + ":");
            e.printStackTrace();
            return ResponseEntity.status(500).body(java.util.Map.of(
                "error", e.getMessage() != null ? e.getMessage() : "Errore durante l'aggiornamento dell'employee",
                "type", e.getClass().getSimpleName()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    //Restituisce tutte le valutazioni assegnate ad un agente.
    @GetMapping("/{id}/valuations")
    public List<PropertyValuationDTO> listValuationsByEmployee(@PathVariable Integer id) {
        return valuationService
                .findAll()
                .stream()
                .filter(v -> id.equals(v.employeeId()))
                .toList();
    }

     //Assegna una valutazione ad un agente. 
    @PutMapping("/valuation/{valuationId}/assign/{employeeId}")
    public PropertyValuationDTO assignValuation(
            @PathVariable Integer valuationId,
            @PathVariable Integer employeeId
    ) {
        return valuationService.assignEmployee(valuationId, employeeId);
    }

     //Aggiorna lo status della valutazione.
    @PutMapping("/valuation/{valuationId}/status")
    public PropertyValuationDTO updateStatus(
            @PathVariable Integer valuationId,
            @RequestParam ValuationStatus status
    ) {
        return valuationService.updateStatus(valuationId, status);
    }
}
