package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.services.PropertyAddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/property-addresses")
public class PropertyAddressController {

    private final PropertyAddressService propertyAddressService;

    public PropertyAddressController(PropertyAddressService propertyAddressService) {
        this.propertyAddressService = propertyAddressService;
    }

    @GetMapping
    public List<PropertyAddressDTO> list() {
        return propertyAddressService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyAddressDTO getById(@PathVariable Integer id) {
        return propertyAddressService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyAddressDTO> create(@RequestBody PropertyAddressDTO dto) {
        PropertyAddressDTO created = propertyAddressService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.propertyId()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyAddressDTO update(@PathVariable Integer id, @RequestBody PropertyAddressDTO dto) {
        return propertyAddressService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        propertyAddressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

