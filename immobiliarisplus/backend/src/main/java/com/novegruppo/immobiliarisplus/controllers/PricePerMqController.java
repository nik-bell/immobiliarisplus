package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PricePerMqDTO;
import com.novegruppo.immobiliarisplus.services.PricePerMqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/price-per-sqm")
public class PricePerMqController {

    private final PricePerMqService service;

    public PricePerMqController(PricePerMqService service) {
        this.service = service;
    }

    @GetMapping
    public List<PricePerMqDTO> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public PricePerMqDTO getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @GetMapping("/zip/{zipCode}")
    public PricePerMqDTO getByZipCode(@PathVariable String zipCode) {
        return service.findByZipCode(zipCode);
    }

    @PostMapping
    public ResponseEntity<PricePerMqDTO> create(@RequestBody PricePerMqDTO dto) {
        PricePerMqDTO created = service.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(created.id())
            .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PricePerMqDTO update(@PathVariable Integer id, @RequestBody PricePerMqDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

