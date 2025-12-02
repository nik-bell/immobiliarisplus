package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.NotificationRoleTarget;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record NotificationDTO(
        Integer id,

        @NotNull(message = "L'ID del destinatario non può essere nullo.")
        Integer recipientId,

        @NotNull(message = "Il ruolo target non può essere nullo.")
        NotificationRoleTarget roleTarget,

        @NotBlank(message = "Il contenuto non può essere vuoto.")
        String content,

        Boolean isRead,

        LocalDateTime createdAt
) {}
