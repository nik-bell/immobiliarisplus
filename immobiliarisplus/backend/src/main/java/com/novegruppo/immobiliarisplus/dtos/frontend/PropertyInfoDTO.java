package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyInfoDTO(
    String address,
    String zipCode,
    String city,
    String propertyType,
    String condition,
    Integer surfaceM2
) {}

