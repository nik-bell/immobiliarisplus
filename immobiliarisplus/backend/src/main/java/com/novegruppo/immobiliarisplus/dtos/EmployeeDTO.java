package com.novegruppo.immobiliarisplus.dtos;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record EmployeeDTO(
        Integer id,

        @NotNull(message = "L'ID utente non può essere nullo.")
        Integer userId,

        @NotBlank(message = "Il nome non può essere vuoto.")
        @Size(max = 100, message = "Il nome è troppo lungo.")
        String name,

        @NotBlank(message = "Il cognome non può essere vuoto.")
        @Size(max = 100, message = "Il cognome è troppo lungo.")
        String surname,

        @Size(max = 20, message = "Il numero di telefono è troppo lungo.")
        String phone,

        LocalDateTime createdAt
) {}
