package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/valuations")
public class PropertyValuationController {

    private final PropertyValuationService propertyValuationService;

    public PropertyValuationController(PropertyValuationService propertyValuationService) {
        this.propertyValuationService = propertyValuationService;
    }

    @GetMapping
    public List<PropertyValuationDTO> list() {
        return propertyValuationService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyValuationDTO getById(@PathVariable Integer id) {
        return propertyValuationService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyValuationDTO> create(@RequestBody PropertyValuationDTO dto) {
        PropertyValuationDTO created = propertyValuationService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyValuationDTO update(@PathVariable Integer id, @RequestBody PropertyValuationDTO dto) {
        return propertyValuationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
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
