package com.novegruppo.immobiliarisplus.services.impl;

import java.util.stream.Collectors;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import com.novegruppo.immobiliarisplus.repositories.PropertyValuationRepository;
import com.novegruppo.immobiliarisplus.repositories.PropertyRepository;
import com.novegruppo.immobiliarisplus.repositories.EmployeeRepository;
import com.novegruppo.immobiliarisplus.mappers.PropertyValuationMapper;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.entities.PropertyValuation;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;

@Transactional
@Service
public class PropertyValuationServiceImpl implements PropertyValuationService {

    private final PropertyValuationMapper propertyValuationMapper;
    private final EmployeeRepository employeeRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyValuationRepository propertyValuationRepository;

    public PropertyValuationServiceImpl(PropertyValuationRepository propertyValuationRepository,
                                        EmployeeRepository employeeRepository,
                                        PropertyRepository propertyRepository,
                                        PropertyValuationMapper propertyValuationMapper) {

        this.propertyValuationMapper = propertyValuationMapper;
        this.employeeRepository = employeeRepository;
        this.propertyRepository = propertyRepository;
        this.propertyValuationRepository = propertyValuationRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public List<PropertyValuationDTO> findAll() {

        return propertyValuationRepository.findAll()
                .stream()
                .map(propertyValuationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyValuationDTO findById(Integer integer) {

        PropertyValuation entity = propertyValuationRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + integer));
        return propertyValuationMapper.toDTO(entity);

    }

    @Override
    public PropertyValuationDTO create(PropertyValuationDTO propertyValuationDTO) {
        if (propertyValuationDTO.propertyId() == null) {
            throw new IllegalArgumentException("propertyId è obbligatorio");
        }

        if (propertyValuationDTO.employeeId() == null) {
            throw new IllegalArgumentException("employeeId è obbligatorio");
        }

        Property property = propertyRepository.findById(propertyValuationDTO.propertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + propertyValuationDTO.propertyId()));

        Employee employee = employeeRepository.findById(propertyValuationDTO.employeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee non trovato con id=" + propertyValuationDTO.employeeId()));

        PropertyValuation entity = propertyValuationMapper.fromCreate(propertyValuationDTO);
        entity.setProperty(property);
        entity.setEmployee(employee);
        PropertyValuation saved = propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(saved);
    }

    @Override
    public PropertyValuationDTO update(Integer integer, PropertyValuationDTO propertyValuationDTO) {
        PropertyValuation entity = propertyValuationRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + integer));

        if (propertyValuationDTO.propertyId() != null && (entity.getProperty() == null || !propertyValuationDTO.propertyId().equals(entity.getProperty().getId()))) {
            Property property = propertyRepository.findById(propertyValuationDTO.propertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property non trovata con id=" + propertyValuationDTO.propertyId()));
            entity.setProperty(property);
        }

        if (propertyValuationDTO.employeeId() != null && (entity.getEmployee() == null || !propertyValuationDTO.employeeId().equals(entity.getEmployee().getId()))) {
            Employee employee = employeeRepository.findById(propertyValuationDTO.employeeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee non trovato con id=" + propertyValuationDTO.employeeId()));
            entity.setEmployee(employee);
        }

        propertyValuationMapper.updateEntityFromUpdate(propertyValuationDTO, entity);
        PropertyValuation saved = propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer integer) {

        if (!propertyValuationRepository.existsById(integer)) {
            throw new ResourceNotFoundException("PropertyValuation non trovata con id=" + integer);
        }
        propertyValuationRepository.deleteById(integer);

    }




}