package com.novegruppo.immobiliarisplus.dtos;

import java.math.BigDecimal;

public record PricePerMqDTO(
    Integer id,
    String zipCode,
    String city,
    BigDecimal pricePerMq
) {}

