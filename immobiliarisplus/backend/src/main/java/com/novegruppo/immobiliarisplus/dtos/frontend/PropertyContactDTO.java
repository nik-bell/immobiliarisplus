package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyContactDTO(
    String name,
    String surname,
    String email,
    String phone,
    Boolean privacyAccepted
) {}