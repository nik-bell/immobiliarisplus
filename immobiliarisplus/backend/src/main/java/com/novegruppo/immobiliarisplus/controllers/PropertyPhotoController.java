package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyPhotoDTO;
import com.novegruppo.immobiliarisplus.services.PropertyPhotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/property-photos")
public class PropertyPhotoController {

    private final PropertyPhotoService propertyPhotoService;

    public PropertyPhotoController(PropertyPhotoService propertyPhotoService) {
        this.propertyPhotoService = propertyPhotoService;
    }

    @GetMapping
    public List<PropertyPhotoDTO> list() {
        return propertyPhotoService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyPhotoDTO getById(@PathVariable Integer id) {
        return propertyPhotoService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyPhotoDTO> create(@RequestBody PropertyPhotoDTO dto) {
        PropertyPhotoDTO created = propertyPhotoService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyPhotoDTO update(@PathVariable Integer id, @RequestBody PropertyPhotoDTO dto) {
        return propertyPhotoService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        propertyPhotoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

