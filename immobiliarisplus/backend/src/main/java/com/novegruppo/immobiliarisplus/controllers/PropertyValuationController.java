package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/valuations")
public class PropertyValuationController {

    private final PropertyValuationService valuationService;

    public PropertyValuationController(PropertyValuationService valuationService) {
        this.valuationService = valuationService;
    }

    @GetMapping
    public List<PropertyValuationDTO> list() {
        return valuationService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyValuationDTO getById(@PathVariable Integer id) {
        return valuationService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyValuationDTO> create(@RequestBody PropertyValuationDTO dto) {
        PropertyValuationDTO created = valuationService.create(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyValuationDTO update(@PathVariable Integer id,
                                       @RequestBody PropertyValuationDTO dto) {
        return valuationService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        valuationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
