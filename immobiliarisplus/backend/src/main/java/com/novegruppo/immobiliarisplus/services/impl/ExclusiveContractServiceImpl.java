package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.ExclusiveContractDTO;
import com.novegruppo.immobiliarisplus.entities.ExclusiveContract;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.ExclusiveContractMapper;
import com.novegruppo.immobiliarisplus.repositories.ExclusiveContractRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.services.ExclusiveContractService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExclusiveContractServiceImpl implements ExclusiveContractService {

    private final ExclusiveContractRepository exclusiveContractRepository;
    private final PropertyRepository propertyRepository;
    private final ExclusiveContractMapper exclusiveContractMapper;

    public ExclusiveContractServiceImpl(ExclusiveContractRepository exclusiveContractRepository,
                                        PropertyRepository propertyRepository,
                                        ExclusiveContractMapper exclusiveContractMapper) {
        this.exclusiveContractRepository = exclusiveContractRepository;
        this.propertyRepository = propertyRepository;
        this.exclusiveContractMapper = exclusiveContractMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExclusiveContractDTO> findAll() {
        return exclusiveContractRepository.findAll()
                .stream()
                .map(exclusiveContractMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ExclusiveContractDTO findById(Integer id) {
        ExclusiveContract entity = exclusiveContractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExclusiveContract non trovato con id=" + id));
        return exclusiveContractMapper.toDTO(entity);
    }

    @Override
    public ExclusiveContractDTO create(ExclusiveContractDTO dto) {
        if (dto.propertyId() == null) {
            throw new IllegalArgumentException("propertyId è obbligatorio");
        }

        Property property = propertyRepository.findById(dto.propertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));

        ExclusiveContract entity = exclusiveContractMapper.fromCreate(dto);
        entity.setProperty(property);
        ExclusiveContract saved = exclusiveContractRepository.save(entity);
        return exclusiveContractMapper.toDTO(saved);
    }

    @Override
    public ExclusiveContractDTO update(Integer id, ExclusiveContractDTO dto) {
        ExclusiveContract entity = exclusiveContractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExclusiveContract non trovato con id=" + id));

        if (dto.propertyId() != null && (entity.getProperty() == null || !dto.propertyId().equals(entity.getProperty().getId()))) {
            Property property = propertyRepository.findById(dto.propertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));
            entity.setProperty(property);
        }

        exclusiveContractMapper.updateEntityFromUpdate(dto, entity);
        ExclusiveContract saved = exclusiveContractRepository.save(entity);
        return exclusiveContractMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!exclusiveContractRepository.existsById(id)) {
            throw new ResourceNotFoundException("ExclusiveContract non trovato con id=" + id);
        }
        exclusiveContractRepository.deleteById(id);
    }
}

