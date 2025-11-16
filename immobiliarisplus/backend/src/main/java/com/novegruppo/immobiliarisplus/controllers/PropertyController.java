package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<PropertyDTO> list() {
        return propertyService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyDTO getById(@PathVariable Integer id) {
        return propertyService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyDTO> create(@RequestBody PropertyCreateDTO dto) {
        PropertyDTO created = propertyService.create(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyDTO update(@PathVariable Integer id, @RequestBody PropertyUpdateDTO dto) {
        return propertyService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        propertyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
