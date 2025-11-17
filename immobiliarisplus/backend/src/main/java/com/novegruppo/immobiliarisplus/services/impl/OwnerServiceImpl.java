package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.OwnerMapper;
import com.novegruppo.immobiliarisplus.repositories.OwnerRepository;
import com.novegruppo.immobiliarisplus.services.OwnerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;
    private final OwnerMapper ownerMapper;

    public OwnerServiceImpl(OwnerRepository ownerRepository, OwnerMapper ownerMapper) {
        this.ownerRepository = ownerRepository;
        this.ownerMapper = ownerMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OwnerDTO> findAll() {
        return ownerRepository.findAll()
                .stream()
                .map(ownerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OwnerDTO findById(Integer id) {
        Owner entity = ownerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + id));
        return ownerMapper.toDTO(entity);
    }

    @Override
    public OwnerDTO create(OwnerDTO dto) {
        Owner entity = ownerMapper.fromCreate(dto);
        Owner saved = ownerRepository.save(entity);
        return ownerMapper.toDTO(saved);
    }

    @Override
    public OwnerDTO update(Integer id, OwnerDTO dto) {
        Owner entity = ownerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + id));
        ownerMapper.updateEntityFromUpdate(dto, entity);
        Owner saved = ownerRepository.save(entity);
        return ownerMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!ownerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Owner non trovato con id=" + id);
        }
        ownerRepository.deleteById(id);
    }
}
