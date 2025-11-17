package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyDocs;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.PropertyDocsMapper;
import com.novegruppo.immobiliarisplus.repositories.PropertyDocsRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.services.PropertyDocsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyDocsServiceImpl implements PropertyDocsService {

    private final PropertyDocsRepository propertyDocsRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyDocsMapper propertyDocsMapper;

    public PropertyDocsServiceImpl(PropertyDocsRepository propertyDocsRepository,
                                   PropertyRepository propertyRepository,
                                   PropertyDocsMapper propertyDocsMapper) {
        this.propertyDocsRepository = propertyDocsRepository;
        this.propertyRepository = propertyRepository;
        this.propertyDocsMapper = propertyDocsMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDocsDTO> findAll() {
        return propertyDocsRepository.findAll()
                .stream()
                .map(propertyDocsMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PropertyDocsDTO findById(Integer id) {
        PropertyDocs entity = propertyDocsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyDocs non trovato con id=" + id));
        return propertyDocsMapper.toDTO(entity);
    }

    @Override
    public PropertyDocsDTO create(PropertyDocsDTO dto) {
        if (dto.propertyId() == null) {
            throw new IllegalArgumentException("propertyId è obbligatorio");
        }

        Property property = propertyRepository.findById(dto.propertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));

        PropertyDocs entity = propertyDocsMapper.fromCreate(dto);
        entity.setProperty(property);
        PropertyDocs saved = propertyDocsRepository.save(entity);
        return propertyDocsMapper.toDTO(saved);
    }

    @Override
    public PropertyDocsDTO update(Integer id, PropertyDocsDTO dto) {
        PropertyDocs entity = propertyDocsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyDocs non trovato con id=" + id));

        if (dto.propertyId() != null && (entity.getProperty() == null || !dto.propertyId().equals(entity.getProperty().getId()))) {
            Property property = propertyRepository.findById(dto.propertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));
            entity.setProperty(property);
        }

        propertyDocsMapper.updateEntityFromUpdate(dto, entity);
        PropertyDocs saved = propertyDocsRepository.save(entity);
        return propertyDocsMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!propertyDocsRepository.existsById(id)) {
            throw new ResourceNotFoundException("PropertyDocs non trovato con id=" + id);
        }
        propertyDocsRepository.deleteById(id);
    }
}

