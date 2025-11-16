package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.PropertyMapper;
import com.novegruppo.immobiliarisplus.repository.OwnerRepository;
import com.novegruppo.immobiliarisplus.repository.PropertyRepository;
import com.novegruppo.immobiliarisplus.services.PropertyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final OwnerRepository ownerRepository;
    private final PropertyMapper propertyMapper;

    public PropertyServiceImpl(PropertyRepository propertyRepository,
                               OwnerRepository ownerRepository,
                               PropertyMapper propertyMapper) {
        this.propertyRepository = propertyRepository;
        this.ownerRepository = ownerRepository;
        this.propertyMapper = propertyMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> findAll() {
        return propertyRepository.findAll()
                .stream()
                .map(propertyMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PropertyDTO findById(Integer id) {
        Property entity = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + id));
        return propertyMapper.toDTO(entity);
    }

    @Override
    public PropertyDTO create(PropertyCreateDTO dto) {
        if (dto.ownerId() == null) {
            throw new IllegalArgumentException("ownerId è obbligatorio");
        }
        Owner owner = ownerRepository.findById(dto.ownerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + dto.ownerId()));

        Property entity = propertyMapper.fromCreate(dto);
        entity.setOwner(owner);
        Property saved = propertyRepository.save(entity);
        return propertyMapper.toDTO(saved);
    }

    @Override
    public PropertyDTO update(Integer id, PropertyUpdateDTO dto) {
        Property entity = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + id));

        if (dto.ownerId() != null && (entity.getOwner() == null || !dto.ownerId().equals(entity.getOwner().getId()))) {
            Owner owner = ownerRepository.findById(dto.ownerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + dto.ownerId()));
            entity.setOwner(owner);
        }

        propertyMapper.updateEntityFromUpdate(dto, entity);
        Property saved = propertyRepository.save(entity);
        return propertyMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property non trovata con id=" + id);
        }
        propertyRepository.deleteById(id);
    }

}
