package com.novegruppo.immobiliarisplus.dtos;

import jakarta.validation.constraints.*;


public record PropertyAddressDTO (
    @NotNull(message = "L'ID della proprietà non può essere nullo.")
    Integer propertyId,

    @NotBlank(message = "La via non può essere vuota.")
    @Size(max = 255, message = "La via è troppo lunga.")
    String street,

    @NotBlank(message = "La città non può essere vuota.")
    @Size(max = 100, message = "La città è troppo lunga.")
    String city,

    @NotBlank(message = "Il CAP non può essere vuoto.")
    @Size(max = 10, message = "Il CAP è troppo lungo.")
    String cap,

    @NotBlank(message = "La provincia non può essere vuota.")
    @Size(max = 50, message = "La provincia è troppo lunga.")
    String province,

    Float latitude,

    Float longitude,

    @Min(value = 0, message = "Lo zone score deve essere almeno 0.")
    @Max(value = 100, message = "Lo zone score non può superare 100.")
    Integer zoneScore
) {}

