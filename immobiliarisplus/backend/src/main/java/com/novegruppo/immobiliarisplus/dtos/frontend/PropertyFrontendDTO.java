package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyFrontendDTO(
    PropertyInfoDTO property,
    PropertyDetailsDTO details,
    PropertyContactDTO contact
) {}
