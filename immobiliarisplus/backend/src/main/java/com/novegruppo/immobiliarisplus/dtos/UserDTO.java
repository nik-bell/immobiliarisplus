package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.UserRole;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record UserDTO(
        Integer id,

        Integer ownerId,

        @NotBlank(message = "L'email non può essere vuota.")
        @Email(message = "L'email non è valida.")
        String email,

        @NotNull(message = "Il ruolo non può essere nullo.")
        UserRole role,

        LocalDateTime createdAt
) {}
