package com.novegruppo.immobiliarisplus.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

// for future use

public record PropertyPhotoDTO(
        Integer id,

        @NotNull(message = "L'ID della proprietà non può essere nullo.")
        Integer propertyId,

        @NotBlank(message = "L'URL non può essere vuoto.")
        @Size(max = 500, message = "L'URL è troppo lungo.")
        String url,

        @Size(max = 255, message = "Il public ID è troppo lungo.")
        String publicId,

        @Size(max = 50, message = "Il formato è troppo lungo.")
        String format,

        @Min(value = 1, message = "La larghezza deve essere almeno 1.")
        Integer width,

        @Min(value = 1, message = "L'altezza deve essere almeno 1.")
        Integer height,

        @Min(value = 0, message = "I bytes devono essere almeno 0.")
        Long bytes,

        Boolean isPrimary,

        LocalDateTime uploadedAt,

        @Size(max = 50, message = "La versione è troppo lunga.")
        String version,

        @Size(max = 255, message = "Il testo alternativo è troppo lungo.")
        String altText,

        LocalDateTime createdAt
) {}
