package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.TokenType;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record UserTokenDTO(
        Integer id,

        @NotNull(message = "L'ID utente non può essere nullo.")
        Integer userId,

        @NotBlank(message = "Il token non può essere vuoto.")
        @Size(max = 500, message = "Il token è troppo lungo.")
        String token,

        TokenType type,

        @NotNull(message = "La data di scadenza non può essere nulla.")
        LocalDateTime expiresAt,

        Boolean used,

        LocalDateTime createdAt
) {}
