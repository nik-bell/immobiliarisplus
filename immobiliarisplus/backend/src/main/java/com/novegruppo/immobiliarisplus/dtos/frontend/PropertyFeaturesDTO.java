package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyFeaturesDTO(
    Boolean balcone,
    Boolean garage,
    Boolean giardino,
    Boolean parcheggio,
    Boolean terrazzo,
    Boolean ascensore,
    Boolean cantina
) {}