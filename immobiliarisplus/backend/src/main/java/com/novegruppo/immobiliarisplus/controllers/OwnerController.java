package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.services.OwnerService;
import com.novegruppo.immobiliarisplus.services.PropertyService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/owners")
public class OwnerController {

    private final OwnerService ownerService;
    private final PropertyService propertyService;

    public OwnerController(OwnerService ownerService, PropertyService propertyService) {
        this.ownerService = ownerService;
        this.propertyService = propertyService;
    }

    // Lista completa proprietari 
    @GetMapping
    public List<OwnerDTO> list() {
        return ownerService.findAll();
    }

    @GetMapping("/{id}")
    public OwnerDTO getById(@PathVariable Integer id) {
        return ownerService.findById(id);
    }

    // Registrazione proprietario
    @PostMapping
    public ResponseEntity<OwnerDTO> create(@RequestBody OwnerDTO dto) {
        OwnerDTO created = ownerService.create(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // Modifica proprietario
    @PutMapping("/{id}")
    public OwnerDTO update(@PathVariable Integer id, @RequestBody OwnerDTO dto) {
        return ownerService.update(id, dto);
    }

    // Eliminazione proprietario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Proprietà possedute dal proprietario
    @GetMapping("/{id}/properties")
    public List<PropertyDTO> listPropertiesByOwner(@PathVariable Integer id) {
        return propertyService.findAll()
                .stream()
                .filter(p -> p.ownerId().equals(id))
                .toList();
    }
}
