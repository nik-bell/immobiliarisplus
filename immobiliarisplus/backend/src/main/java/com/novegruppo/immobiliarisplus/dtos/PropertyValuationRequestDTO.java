package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyContactDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyDetailsDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyInfoDTO;



public record PropertyValuationRequestDTO(

    PropertyInfoDTO property,
    PropertyDetailsDTO details,
    PropertyContactDTO contact

) {}

