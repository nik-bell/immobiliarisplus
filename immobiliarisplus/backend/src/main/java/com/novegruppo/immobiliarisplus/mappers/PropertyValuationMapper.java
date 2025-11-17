package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.entities.PropertyValuation;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PropertyValuationMapper {

    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "employee.id", target = "employeeId")
    PropertyValuationDTO toDTO(PropertyValuation entity);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    PropertyValuation fromCreate(PropertyValuationDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromUpdate(PropertyValuationDTO dto, @MappingTarget PropertyValuation entity);
}