package com.novegruppo.immobiliarisplus.services.impl;
import java.util.stream.Collectors;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.novegruppo.immobiliarisplus.services.PropertyAddressService;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyAddressRepository;
import com.novegruppo.immobiliarisplus.mappers.PropertyAddressMapper;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.entities.PropertyAddress;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;

@Service
@Transactional
public class PropertyAddressServiceImpl implements PropertyAddressService {

    private final PropertyAddressMapper propertyAddressMapper;
    private final PropertyRepository propertyRepository;
    private final PropertyAddressRepository propertyAddressRepository;


    public PropertyAddressServiceImpl(PropertyAddressRepository propertyAddressRepository,
                                      PropertyRepository propertyRepository,
                                      PropertyAddressMapper propertyAddressMapper) {
        this.propertyAddressMapper = propertyAddressMapper;
        this.propertyRepository = propertyRepository;
        this.propertyAddressRepository = propertyAddressRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public List<PropertyAddressDTO> findAll() {

        return propertyAddressRepository.findAll()
                .stream()
                .map(propertyAddressMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public PropertyAddressDTO findById(Integer id) {
        PropertyAddress entity = propertyAddressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyAddress non trovata con id=" + id));
        return propertyAddressMapper.toDTO(entity);
    }

    @Override
    public PropertyAddressDTO create(PropertyAddressDTO dto) {
        if (dto.propertyId() == null) {
            throw new IllegalArgumentException("propertyId è obbligatorio");
        }

        Property property = propertyRepository.findById(dto.propertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));

        PropertyAddress entity = propertyAddressMapper.fromCreate(dto);
        entity.setProperty(property);
        PropertyAddress saved = propertyAddressRepository.save(entity);
        return propertyAddressMapper.toDTO(saved);
    }

    @Override
    public PropertyAddressDTO update(Integer id, PropertyAddressDTO dto) {
        PropertyAddress entity = propertyAddressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyAddress non trovata con id=" + id));

        if (dto.propertyId() != null && (entity.getProperty() == null || !dto.propertyId().equals(entity.getProperty().getId()))) {
            Property property = propertyRepository.findById(dto.propertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + dto.propertyId()));
            entity.setProperty(property);
        }

        propertyAddressMapper.updateEntityFromUpdate(dto, entity);
        PropertyAddress saved = propertyAddressRepository.save(entity);
        return propertyAddressMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!propertyAddressRepository.existsById(id)) {
            throw new ResourceNotFoundException("PropertyAddress non trovata con id=" + id);
        }
        propertyAddressRepository.deleteById(id);
    }
}



