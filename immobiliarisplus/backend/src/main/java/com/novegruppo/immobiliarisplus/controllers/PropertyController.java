package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyFrontendDTO;
import com.novegruppo.immobiliarisplus.mappers.PropertyFrontendMapper;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.OwnerService;
import com.novegruppo.immobiliarisplus.services.PropertyAddressService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final OwnerService ownerService;
    private final PropertyAddressService propertyAddressService;

    public PropertyController(PropertyService propertyService, OwnerService ownerService, PropertyAddressService propertyAddressService) {
        this.propertyService = propertyService;
        this.ownerService = ownerService;
        this.propertyAddressService = propertyAddressService;
    }

    // ---------------------------
    // ENDPOINT STANDARD ESISTENTI
    // ---------------------------

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

    // --------------------------------------------
    // ⚡ NUOVO ENDPOINT RICHIESTO DAL FRONTEND
    // --------------------------------------------

    @GetMapping("/frontend/{id}")
    public ResponseEntity<PropertyFrontendDTO> getFrontendById(@PathVariable Integer id) {
        PropertyDTO property;
        try {
            property = propertyService.findById(id);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }

        // Recupera owner se possibile (ownerId non implementato in PropertyDTO: lasciamo owner null)
        OwnerDTO owner = null; // In futuro: aggiungere corretta logica recupero owner

        // Recupera indirizzo collegato se presente (stesso id della property come PK condivisa)
        PropertyAddressDTO address = null;
        try {
            address = propertyAddressService.findById(id);
        } catch (RuntimeException ignored) {
            // indirizzo opzionale
        }

        PropertyFrontendDTO frontend = PropertyFrontendMapper.toFrontendDTO(property, owner, address);
        return ResponseEntity.ok(frontend);
    }
}
