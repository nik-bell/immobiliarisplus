package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.ExclusiveContractDTO;
import com.novegruppo.immobiliarisplus.services.ExclusiveContractService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/exclusive-contracts")
public class ExclusiveContractController {

    private final ExclusiveContractService exclusiveContractService;

    public ExclusiveContractController(ExclusiveContractService exclusiveContractService) {
        this.exclusiveContractService = exclusiveContractService;
    }

    @GetMapping
    public List<ExclusiveContractDTO> list() {
        return exclusiveContractService.findAll();
    }

    @GetMapping("/{id}")
    public ExclusiveContractDTO getById(@PathVariable Integer id) {
        return exclusiveContractService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ExclusiveContractDTO> create(@RequestBody ExclusiveContractDTO dto) {
        ExclusiveContractDTO created = exclusiveContractService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public ExclusiveContractDTO update(@PathVariable Integer id, @RequestBody ExclusiveContractDTO dto) {
        return exclusiveContractService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        exclusiveContractService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

