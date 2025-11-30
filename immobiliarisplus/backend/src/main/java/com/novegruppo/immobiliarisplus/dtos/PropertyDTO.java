package com.novegruppo.immobiliarisplus.dtos;

import java.time.LocalDateTime;
import com.novegruppo.immobiliarisplus.enums.*;
import jakarta.validation.constraints.*;

public record PropertyDTO(

        @NotNull(message = "L'ID non può essere nullo.")
        Integer id,

        // Cognome del proprietario esposto in lettura al posto dell'ownerId
        String ownerSurname,

        PropertyStatus status,

        PropertyType type,

        @NotNull(message = "La dimensione in mq non può essere nulla.")
        @Min(value = 1, message = "La dimensione in mq deve essere almeno 1.")
        Integer sizeMq,

        @NotNull(message = "Il numero di stanze non può essere nullo.")
        @Min(value = 1, message = "Il numero di stanze deve essere almeno 1.")
        Integer rooms,

        @NotNull(message = "Il numero di bagni non può essere nullo.")
        @Min(value = 1, message = "Il numero di bagni deve essere almeno 1.")
        Integer bathrooms,

        @NotNull(message = "Il numero del piano non può essere nullo.")
        @Min(value = 0, message = "Il numero del piano deve essere almeno 0.")
        int floor,

        HeatingType heatingType,

        EnergyClass energyClass,

        @NotBlank(message = "La descrizione non può essere vuota.")
        @Size(max = 65535, message = "La descrizione è troppo lunga.")
        String description,

        Boolean terrace,

        Boolean elevator,

        Boolean boxAuto,

        Boolean garden,

        Boolean basement,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {

    public Object ownerId() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'ownerId'");
    }}
