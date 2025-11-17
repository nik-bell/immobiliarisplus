package com.novegruppo.immobiliarisplus.dtos;

import jakarta.validation.constraints.*;

/**
 * 
 * Contiene solo i dati essenziali per trasferire informazioni sui documenti delle proprietà:
 *  - id: identificativo del documento
 *  - propertyId: ID della proprietà associata
 *  - fileName: nome o percorso del file del documento
 */
public record PropertyDocsDTO(

        @NotNull(message = "L'ID del documento non può essere nullo.")
        Integer id,

        @NotNull(message = "L'ID della proprietà non può essere nullo.")
        Integer propertyId,

        @NotBlank(message = "Il nome del file non può essere vuoto.")
        @Size(max = 255, message = "Il nome del file è troppo lungo.")
        String fileName
) {}

