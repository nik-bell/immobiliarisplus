package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.UserTokenDTO;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.entities.UserToken;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.UserTokenMapper;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
import com.novegruppo.immobiliarisplus.repositories.UserTokensRepository;
import com.novegruppo.immobiliarisplus.services.UserTokenService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserTokenServiceImpl implements UserTokenService {

    private final UserTokensRepository userTokensRepository;
    private final UserRepository userRepository;
    private final UserTokenMapper userTokenMapper;

    public UserTokenServiceImpl(UserTokensRepository userTokensRepository,
                                UserRepository userRepository,
                                UserTokenMapper userTokenMapper) {
        this.userTokensRepository = userTokensRepository;
        this.userRepository = userRepository;
        this.userTokenMapper = userTokenMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserTokenDTO> findAll() {
        return userTokensRepository.findAll()
                .stream()
                .map(userTokenMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserTokenDTO findById(Integer id) {
        UserToken entity = userTokensRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserToken non trovato con id=" + id));
        return userTokenMapper.toDTO(entity);
    }

    @Override
    public UserTokenDTO create(UserTokenDTO dto) {
        if (dto.userId() == null) {
            throw new IllegalArgumentException("userId è obbligatorio");
        }

        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.userId()));

        UserToken entity = userTokenMapper.fromCreate(dto);
        entity.setUser(user);
        UserToken saved = userTokensRepository.save(entity);
        return userTokenMapper.toDTO(saved);
    }

    @Override
    public UserTokenDTO update(Integer id, UserTokenDTO dto) {
        UserToken entity = userTokensRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserToken non trovato con id=" + id));

        if (dto.userId() != null && (entity.getUser() == null || !dto.userId().equals(entity.getUser().getId()))) {
            User user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.userId()));
            entity.setUser(user);
        }

        userTokenMapper.updateEntityFromUpdate(dto, entity);
        UserToken saved = userTokensRepository.save(entity);
        return userTokenMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!userTokensRepository.existsById(id)) {
            throw new ResourceNotFoundException("UserToken non trovato con id=" + id);
        }
        userTokensRepository.deleteById(id);
    }
}

