package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.entities.PropertyAddress;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PropertyAddressMapper {

    @Mapping(source = "property.id", target = "propertyId")
    PropertyAddressDTO toDTO(PropertyAddress entity);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "propertyId", ignore = true)
    PropertyAddress fromCreate(PropertyAddressDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "propertyId", ignore = true)
    void updateEntityFromUpdate(PropertyAddressDTO dto, @MappingTarget PropertyAddress entity);
}
