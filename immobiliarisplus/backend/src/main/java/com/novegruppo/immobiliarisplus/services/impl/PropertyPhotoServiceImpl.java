package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.PropertyPhotoDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyPhoto;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.PropertyPhotoMapper;
import com.novegruppo.immobiliarisplus.repositories.PropertyPhotoRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.services.PropertyPhotoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyPhotoServiceImpl implements PropertyPhotoService {

    private final PropertyPhotoRepository propertyPhotoRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyPhotoMapper propertyPhotoMapper;

    public PropertyPhotoServiceImpl(PropertyPhotoRepository propertyPhotoRepository,
                                    PropertyRepository propertyRepository,
                                    PropertyPhotoMapper propertyPhotoMapper) {
        this.propertyPhotoRepository = propertyPhotoRepository;
        this.propertyRepository = propertyRepository;
        this.propertyPhotoMapper = propertyPhotoMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyPhotoDTO> findAll() {
        return propertyPhotoRepository.findAll()
                .stream()
                .map(propertyPhotoMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PropertyPhotoDTO findById(Integer id) {
        PropertyPhoto entity = propertyPhotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyPhoto non trovata con id=" + id));
        return propertyPhotoMapper.toDTO(entity);
    }

    @Override
    public PropertyPhotoDTO create(PropertyPhotoDTO dto) {
        if (dto.propertyId() == null) {
            throw new IllegalArgumentException("propertyId è obbligatorio");
        }

        Property property = propertyRepository.findById(dto.propertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));

        PropertyPhoto entity = propertyPhotoMapper.fromCreate(dto);
        entity.setProperty(property);
        PropertyPhoto saved = propertyPhotoRepository.save(entity);
        return propertyPhotoMapper.toDTO(saved);
    }

    @Override
    public PropertyPhotoDTO update(Integer id, PropertyPhotoDTO dto) {
        PropertyPhoto entity = propertyPhotoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyPhoto non trovata con id=" + id));

        if (dto.propertyId() != null && (entity.getProperty() == null || !dto.propertyId().equals(entity.getProperty().getId()))) {
            Property property = propertyRepository.findById(dto.propertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));
            entity.setProperty(property);
        }

        propertyPhotoMapper.updateEntityFromUpdate(dto, entity);
        PropertyPhoto saved = propertyPhotoRepository.save(entity);
        return propertyPhotoMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!propertyPhotoRepository.existsById(id)) {
            throw new ResourceNotFoundException("PropertyPhoto non trovata con id=" + id);
        }
        propertyPhotoRepository.deleteById(id);
    }
}

