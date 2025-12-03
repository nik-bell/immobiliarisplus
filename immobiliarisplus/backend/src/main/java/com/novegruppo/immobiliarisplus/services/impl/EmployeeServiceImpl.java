package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.EmployeeMapper;
import com.novegruppo.immobiliarisplus.repositories.EmployeeRepository;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
import com.novegruppo.immobiliarisplus.services.EmployeeService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, UserRepository userRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.employeeMapper = employeeMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO findById(Integer id) {
        Employee entity = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee non trovato con id=" + id));
        return employeeMapper.toDTO(entity);
    }

    @Override
    public EmployeeDTO create(EmployeeDTO dto) {
        if (dto.userId() == null) {
            throw new IllegalArgumentException("userId è obbligatorio");
        }

        // Check if an Employee is already associated with the given userId
        if (employeeRepository.existsByUserId(dto.userId())) {
            throw new IllegalArgumentException("Esiste già un employee associato all'utente con id=" + dto.userId());
        }

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.userId()));

        Employee entity = employeeMapper.fromCreate(dto);
        entity.setUser(user);
        Employee saved = employeeRepository.save(entity);
        return employeeMapper.toDTO(saved);
    }

    @Override
    public EmployeeDTO update(Integer id, EmployeeDTO dto) {
        Employee entity = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee non trovato con id=" + id));

        if (dto.userId() != null && (entity.getUser() == null || !dto.userId().equals(entity.getUser().getId()))) {
            // Check if another Employee is already associated with the given userId
            employeeRepository.findByUserId(dto.userId()).ifPresent(existingEmployee -> {
                if (!existingEmployee.getId().equals(id)) {
                    throw new IllegalArgumentException("Esiste già un employee associato all'utente con id=" + dto.userId());
                }
            });

            User user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.userId()));
            entity.setUser(user);
        }

        employeeMapper.updateEntityFromUpdate(dto, entity);
        Employee saved = employeeRepository.save(entity);
        return employeeMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee non trovato con id=" + id);
        }
        employeeRepository.deleteById(id);
    }
}

