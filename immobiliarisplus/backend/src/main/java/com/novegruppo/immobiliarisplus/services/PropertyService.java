package com.novegruppo.immobiliarisplus.services;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;

public interface PropertyService extends CrudService<PropertyCreateDTO, PropertyUpdateDTO, PropertyDTO, Integer> {
}
