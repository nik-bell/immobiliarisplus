package com.novegruppo.immobiliarisplus.dtos;


import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record PropertyValuationDTO(
        Integer id,

        @NotNull(message = "L'ID della proprietà non può essere nullo.")
        Integer propertyId,

        Integer employeeId,

        Boolean improveProperty,

        Boolean exclusiveContract,

        ValuationStatus status,

        @Min(value = 0, message = "Il prezzo minimo stimato deve essere almeno 0.")
        Double estimatedPriceMin,

        @Min(value = 0, message = "Il prezzo massimo stimato deve essere almeno 0.")
        Double estimatedPriceMax,

        @Min(value = 0, message = "Il valore finale della valutazione deve essere almeno 0.")
        Double valuationFinal,

        @Min(value = 0, message = "Il prezzo al mq deve essere almeno 0.")
        Double pricePerMq,

        @Min(value = 0, message = "Il punteggio di confidenza deve essere almeno 0.")
        @Max(value = 100, message = "Il punteggio di confidenza non può superare 100.")
        Integer confidenceScore,

        @Size(max = 255, message = "La sorgente dati è troppo lunga.")
        String dataSource,

        @Size(max = 1000, message = "Le note sono troppo lunghe.")
        String notes,

        LocalDateTime createdAt
) {}
