package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyContactDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyDetailsDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyInfoDTO;



public record PropertyValuationRequestDTO(

    PropertyInfoDTO property,
    PropertyDetailsDTO details,
    PropertyContactDTO contact
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


) {}

