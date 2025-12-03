package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.UserMapper;
import com.novegruppo.immobiliarisplus.repositories.OwnerRepository;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
import com.novegruppo.immobiliarisplus.repositories.EmployeeRepository;
import com.novegruppo.immobiliarisplus.services.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OwnerRepository ownerRepository;
    private final UserMapper userMapper;
    private final EmployeeRepository employeeRepository;

    public UserServiceImpl(UserRepository userRepository, OwnerRepository ownerRepository, UserMapper userMapper,
                           EmployeeRepository employeeRepository) {
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
        this.userMapper = userMapper;
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO findById(Integer id) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + id));
        return userMapper.toDTO(entity);
    }

    @Override
    public UserDTO create(UserDTO dto) {
        User entity = userMapper.fromCreate(dto);

        if (dto.ownerId() != null) {
            Owner owner = ownerRepository.findById(dto.ownerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + dto.ownerId()));
            entity.setOwner(owner);
            // email took from owner
            entity.setEmail(owner.getEmail());
        } else {
            // if no owner, use email from DTO
            entity.setEmail(dto.email());
        }

        User saved = userRepository.save(entity);

        // Auto creation of Employee for ADMIN and AGENT roles
        if (saved.getRole() == UserRole.ADMIN || saved.getRole() == UserRole.AGENT) {
            // Avoid duplicates if an employee linked to this user already exists
            boolean alreadyExists = employeeRepository.existsByUserId(saved.getId());
            if (!alreadyExists) {
                String email = saved.getEmail();
                String[] nameParts = parseNameSurnameFromEmail(email);
                Employee employee = new Employee();
                employee.setUser(saved);
                employee.setName(nameParts[0]);
                employee.setSurname(nameParts[1]);
                employee.setPhone("N/A"); // Placeholder phone, can be updated later
                employeeRepository.save(employee);
            }
        }

        return userMapper.toDTO(saved);
    }

    @Override
    public UserDTO update(Integer id, UserDTO dto) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + id));

        if (dto.ownerId() != null && (entity.getOwner() == null || !dto.ownerId().equals(entity.getOwner().getId()))) {
            Owner owner = ownerRepository.findById(dto.ownerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Owner non trovato con id=" + dto.ownerId()));
            entity.setOwner(owner);
            // refresh email from owner
            entity.setEmail(owner.getEmail());
        } else if (dto.ownerId() == null && dto.email() != null) {
            // if no owner, allow email update from DTO
            entity.setEmail(dto.email());
        }

        userMapper.updateEntityFromUpdate(dto, entity);
        User saved = userRepository.save(entity);
        return userMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User non trovato con id=" + id);
        }
        userRepository.deleteById(id);
    }

    // Extract name and surname from email (format: name.surname@immobiliarisplus.com)
    private String[] parseNameSurnameFromEmail(String email) {
        if (email == null) {
            return new String[]{"NOME", "COGNOME"};
        }
        String localPart = email.split("@")[0];
        String[] pieces = localPart.split("\\.");
        if (pieces.length >= 2) {
            String nome = normalizeNamePiece(pieces[0]);
            String cognome = normalizeNamePiece(pieces[1]);
            return new String[]{nome, cognome};
        } else {
            String nome = normalizeNamePiece(localPart);
            return new String[]{nome, "User"};
        }
    }

    // Normalize name piece by capitalizing first letter and handling special characters
    private String normalizeNamePiece(String raw) {
        if (raw == null || raw.isBlank()) return "User";
        String cleaned = raw.trim().toLowerCase().replace("_", " ").replace("-", " ");

        StringBuilder sb = new StringBuilder();
        for (String part : cleaned.split(" ")) {
            if (part.isBlank()) continue;
            sb.append(Character.toUpperCase(part.charAt(0)))
              .append(part.substring(1))
              .append(" ");
        }
        return sb.toString().trim();
    }
}
