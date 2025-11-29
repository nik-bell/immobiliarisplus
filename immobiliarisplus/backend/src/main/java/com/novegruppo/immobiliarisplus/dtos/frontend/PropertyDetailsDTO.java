package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyDetailsDTO(
    Integer rooms,
    Integer bathrooms,
    String floor,
    PropertyFeaturesDTO features
) {}
