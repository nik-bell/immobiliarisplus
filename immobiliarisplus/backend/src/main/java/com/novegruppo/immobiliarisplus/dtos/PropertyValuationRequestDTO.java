package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyFrontendDTO;

import java.math.BigDecimal;

public record PropertyValuationRequestDTO(

    PropertyFrontendDTO propertyFrontendDTO,
    // Dati immobile
//    String zipCode,
//    String city,
//    String address,
//    BigDecimal sizeMq,
//    String floor,
//    Integer numberOfRooms,
//    Integer numberOfBathrooms,
//    String condition,
//    String propertyType,
//    String heatingType,
//    Boolean hasTerrace,
//    Boolean hasElevator,
//    Boolean hasGarden,
//    Boolean hasBasement,
//    Boolean hasGarage,

    OwnerDTO ownerDTO
    // Dati owner
//    String ownerName,
//    String ownerSurname,
//    String ownerEmail,
//    String ownerPhone
) {}

