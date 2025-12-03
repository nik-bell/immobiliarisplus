package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.PricePerMqDTO;
import com.novegruppo.immobiliarisplus.entities.PricePerMq;
import com.novegruppo.immobiliarisplus.mappers.PricePerMqMapper;
import com.novegruppo.immobiliarisplus.repositories.PricePerMqRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

// Service for managing PricePerMq entities for real estate pricing based on CAP.

@Service
public class PricePerMqService {

    private final PricePerMqRepository repository;
    private final PricePerMqMapper mapper;

    public PricePerMqService(PricePerMqRepository repository, PricePerMqMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<PricePerMqDTO> findAll() {
        return repository.findAll().stream()
            .map(mapper::toDTO)
            .collect(Collectors.toList());
    }

    public PricePerMqDTO findById(Integer id) {
        return repository.findById(id)
            .map(mapper::toDTO)
            .orElseThrow(() -> new RuntimeException("PricePerMq non trovato con id: " + id));
    }

    public PricePerMqDTO findByZipCode(String zipCode) {
        return repository.findByZipCode(zipCode)
            .map(mapper::toDTO)
            .orElseThrow(() -> new RuntimeException("Prezzo al mq non trovato per CAP: " + zipCode));
    }

    public PricePerMqDTO create(PricePerMqDTO dto) {
        PricePerMq entity = mapper.toEntity(dto);
        PricePerMq saved = repository.save(entity);
        return mapper.toDTO(saved);
    }

    public PricePerMqDTO update(Integer id, PricePerMqDTO dto) {
        PricePerMq existing = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("PricePerMq non trovato con id: " + id));
        
        existing.setZipCode(dto.zipCode());
        existing.setCity(dto.city());
        existing.setPricePerMq(dto.pricePerMq());
        
        PricePerMq updated = repository.save(existing);
        return mapper.toDTO(updated);
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("PricePerMq non trovato con id: " + id);
        }
        repository.deleteById(id);
    }
}

