package com.novegruppo.immobiliarisplus.dtos;

import java.time.LocalDate;
import jakarta.validation.constraints.*;
import com.novegruppo.immobiliarisplus.enums.ContractStatus;

// for future use

public record ExclusiveContractDTO(

        @NotNull(message = "L'ID del contratto non può essere nullo.")
        Integer id,

        @NotNull(message = "L'ID della proprietà non può essere nullo.")
        Integer propertyId,

        @NotBlank(message = "L'URL del contratto non può essere vuoto.")
        String contractUrl,

        @NotNull(message = "Lo stato del contratto e obbligatorio.")
        ContractStatus status,

        LocalDate signedAt,

        @NotNull(message = "La data di scadenza non può essere nulla.")
        LocalDate expirationDate

) {}
