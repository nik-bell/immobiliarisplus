package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.dtos.NotificationDTO;
import com.novegruppo.immobiliarisplus.entities.Notification;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.mappers.NotificationMapper;
import com.novegruppo.immobiliarisplus.repositories.NotificationRepository;
import com.novegruppo.immobiliarisplus.repositories.UserRepository;
import com.novegruppo.immobiliarisplus.services.NotificationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// for future use

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository,
                                   UserRepository userRepository,
                                   NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationDTO> findAll() {
        return notificationRepository.findAll()
                .stream()
                .map(notificationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public NotificationDTO findById(Integer id) {
        Notification entity = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification non trovata con id=" + id));
        return notificationMapper.toDTO(entity);
    }

    @Override
    public NotificationDTO create(NotificationDTO dto) {
        if (dto.recipientId() == null) {
            throw new IllegalArgumentException("recipientId è obbligatorio");
        }

        User recipient = userRepository.findById(dto.recipientId())
                .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.recipientId()));

        Notification entity = notificationMapper.fromCreate(dto);
        entity.setRecipient(recipient);
        Notification saved = notificationRepository.save(entity);
        return notificationMapper.toDTO(saved);
    }

    @Override
    public NotificationDTO update(Integer id, NotificationDTO dto) {
        Notification entity = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification non trovata con id=" + id));

        if (dto.recipientId() != null && (entity.getRecipient() == null || !dto.recipientId().equals(entity.getRecipient().getId()))) {
            User recipient = userRepository.findById(dto.recipientId())
                    .orElseThrow(() -> new ResourceNotFoundException("User non trovato con id=" + dto.recipientId()));
            entity.setRecipient(recipient);
        }

        notificationMapper.updateEntityFromUpdate(dto, entity);
        Notification saved = notificationRepository.save(entity);
        return notificationMapper.toDTO(saved);
    }

    @Override
    public void delete(Integer id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Notification non trovata con id=" + id);
        }
        notificationRepository.deleteById(id);
    }
}

