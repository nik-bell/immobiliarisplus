package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.enums.ValuationStatus;

public interface PropertyValuationService extends CrudService<PropertyValuationDTO, PropertyValuationDTO, PropertyValuationDTO, Integer> {

    // Calculate and save a property valuation based on the request data
    PropertyValuationResultDTO calculateAndSave(PropertyValuationRequestDTO request);

    // Assign an employee to a property valuation
    PropertyValuationDTO assignEmployee(Integer valuationId, Integer employeeId);

    // Update the status of a property valuation
    PropertyValuationDTO updateStatus(Integer valuationId, ValuationStatus status);

    // Update the notes of a property valuation
    PropertyValuationDTO updateNotes(Integer valuationId, String notes);

    // Update the final price of a property valuation
    PropertyValuationDTO updateFinalPrice(Integer valuationId, Double finalPrice);
}
