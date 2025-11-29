package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyFrontendDTO;
import com.novegruppo.immobiliarisplus.mappers.PropertyFrontendMapper;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import com.novegruppo.immobiliarisplus.services.OwnerService;

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

    public PropertyController(PropertyService propertyService, OwnerService ownerService) {
        this.propertyService = propertyService;
        this.ownerService = ownerService;
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
        // Recupera la property (attenzione: findById potrebbe lanciare eccezione se non trovata)
        PropertyDTO property;
        try {
            property = propertyService.findById(id);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }

        // Recupera l'owner solo se presente
        OwnerDTO owner = null;
        if (property != null && property.ownerId() != null) {
            try {
                owner = ownerService.findById(property.ownerId());
            } catch (RuntimeException ignored) {
                // se non trovato o errore, lasciamo owner = null (frontend supporta campi vuoti)
            }
        }

        PropertyFrontendDTO frontend = PropertyFrontendMapper.toFrontendDTO(property, owner);
        return ResponseEntity.ok(frontend);
    }
}
