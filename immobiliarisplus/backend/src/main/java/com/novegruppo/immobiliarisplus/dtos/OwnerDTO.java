package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.ContactPreference;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record OwnerDTO(
        Integer id,

        @NotBlank(message = "Il nome non può essere vuoto.")
        @Size(max = 100, message = "Il nome è troppo lungo.")
        String name,

        @NotBlank(message = "Il cognome non può essere vuoto.")
        @Size(max = 100, message = "Il cognome è troppo lungo.")
        String surname,

        @NotBlank(message = "L'email non può essere vuota.")
        @Email(message = "L'email non è valida.")
        String email,

        @NotBlank(message = "Il numero di telefono non può essere vuoto.")
        @Size(max = 20, message = "Il numero di telefono è troppo lungo.")
        String phone,

        @NotNull(message = "La preferenza di contatto non può essere nulla.")
        ContactPreference contactPreference,

        LocalDateTime createdAt
) {}