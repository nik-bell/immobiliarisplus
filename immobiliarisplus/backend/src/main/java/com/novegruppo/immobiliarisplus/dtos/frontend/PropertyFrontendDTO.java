package com.novegruppo.immobiliarisplus.dtos.frontend;

// Aggregated DTO for frontend property representation no more used in backend logic

public record PropertyFrontendDTO(
    PropertyInfoDTO property,
    PropertyDetailsDTO details,
    PropertyContactDTO contact
) {}
