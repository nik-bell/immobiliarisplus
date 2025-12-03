package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.enums.ValuationStatus;

public interface PropertyValuationService extends CrudService<PropertyValuationDTO, PropertyValuationDTO, PropertyValuationDTO, Integer> {
    PropertyValuationResultDTO calculateAndSave(PropertyValuationRequestDTO request);

    // Nuovi metodi dedicati
    PropertyValuationDTO assignEmployee(Integer valuationId, Integer employeeId);
    PropertyValuationDTO updateStatus(Integer valuationId, ValuationStatus status);
    PropertyValuationDTO updateNotes(Integer valuationId, String notes);
    PropertyValuationDTO updateFinalPrice(Integer valuationId, Double finalPrice);
}
