package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyDetailsDTO(
    Integer rooms,
    Integer bathrooms,
    Integer floor,
    PropertyFeaturesDTO features
) {}
