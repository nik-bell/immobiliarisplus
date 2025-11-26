package com.novegruppo.immobiliarisplus.dtos;

import java.math.BigDecimal;

public record PropertyValuationResultDTO(
    BigDecimal estimatedValue,
    BigDecimal minValue,
    BigDecimal maxValue,
    BigDecimal pricePerSqm,
    String details
) {}

