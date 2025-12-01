package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.*;

public record PropertyCreateDTO(
        Boolean basement,
        Boolean garden,
        Boolean boxAuto,
        Boolean elevator,
        Boolean terrace,
        String description,
        EnergyClass energyClass,
        HeatingType heatingType,
        Integer floor,
        Integer bathrooms,
        Integer rooms,
        Integer sizeMq,
        PropertyType type,
        PropertyStatus status,
        Integer ownerId
) {}
