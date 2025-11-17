package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.UserMapper;
import com.novegruppo.immobiliarisplus.repositories.OwnerRepository;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
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

    public UserServiceImpl(UserRepository userRepository, OwnerRepository ownerRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.ownerRepository = ownerRepository;
        this.userMapper = userMapper;
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
            // email deriva da owner
            entity.setEmail(owner.getEmail());
        } else {
            // se non c'è owner, usa l'email dal DTO
            entity.setEmail(dto.email());
        }

        User saved = userRepository.save(entity);
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
            // riallinea email da owner
            entity.setEmail(owner.getEmail());
        } else if (dto.ownerId() == null && dto.email() != null) {
            // se non c'è owner, consenti update dell'email dal DTO
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
}
