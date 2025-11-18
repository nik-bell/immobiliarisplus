package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.enums.Priority;
import com.novegruppo.immobiliarisplus.services.EmployeeService;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final PropertyValuationService valuationService;

    public EmployeeController(EmployeeService employeeService, PropertyValuationService valuationService) {
        this.employeeService = employeeService;
        this.valuationService = valuationService;
    }

    @GetMapping
    public List<EmployeeDTO> list() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public EmployeeDTO getById(@PathVariable Integer id) {
        return employeeService.findById(id);
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> create(@RequestBody EmployeeDTO dto) {
        EmployeeDTO created = employeeService.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public EmployeeDTO update(@PathVariable Integer id, @RequestBody EmployeeDTO dto) {
        return employeeService.update(id, dto);
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
        PropertyValuationDTO dto = valuationService.findById(valuationId);

        PropertyValuationDTO updated = new PropertyValuationDTO(
                dto.id(),
                dto.propertyId(),
                employeeId,
                dto.improveProperty(),
                dto.exclusiveContract(),
                dto.priority(),
                dto.estimatedPriceMin(),
                dto.estimatedPriceMax(),
                dto.pricePerMq(),
                dto.confidenceScore(),
                dto.dataSource(),
                dto.createdAt()
        );

        return valuationService.update(valuationId, updated);
    }

     //Aggiorna la priorità (stato) della valutazione.
    @PutMapping("/valuation/{valuationId}/priority")
    public PropertyValuationDTO updatePriority(
            @PathVariable Integer valuationId,
            @RequestParam Priority priority
    ) {
        PropertyValuationDTO dto = valuationService.findById(valuationId);

        PropertyValuationDTO updated = new PropertyValuationDTO(
                dto.id(),
                dto.propertyId(),
                dto.employeeId(),
                dto.improveProperty(),
                dto.exclusiveContract(),
                priority,  // Cambiamo SOLO questo
                dto.estimatedPriceMin(),
                dto.estimatedPriceMax(),
                dto.pricePerMq(),
                dto.confidenceScore(),
                dto.dataSource(),
                dto.createdAt()
        );

        return valuationService.update(valuationId, updated);
    }
}
