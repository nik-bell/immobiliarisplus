package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;

public interface PropertyValuationService extends CrudService<PropertyValuationDTO, PropertyValuationDTO, PropertyValuationDTO, Integer> {
    PropertyValuationResultDTO calculateAndSave(PropertyValuationRequestDTO request);
}

