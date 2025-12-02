package com.novegruppo.immobiliarisplus.dtos;

public record PropertyUpdateDTO(
        Integer ownerId,
        String status,
        String type,
        Integer sizeMq,
        Integer rooms,
        Integer bathrooms,
        Integer floor,
        String heatingType,
        String energyClass,
        String description,
        Boolean terrace,
        Boolean elevator,
        Boolean boxAuto,
        Boolean garden,
        Boolean basement
) {}
