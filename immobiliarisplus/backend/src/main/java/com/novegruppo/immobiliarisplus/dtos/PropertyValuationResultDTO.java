package com.novegruppo.immobiliarisplus.dtos;

import java.math.BigDecimal;

// DTO representing the result of a property valuation.

public record PropertyValuationResultDTO(
    BigDecimal estimatedValue,
    BigDecimal minValue,
    BigDecimal maxValue,
    BigDecimal pricePerSqm,
    String details
) {}

