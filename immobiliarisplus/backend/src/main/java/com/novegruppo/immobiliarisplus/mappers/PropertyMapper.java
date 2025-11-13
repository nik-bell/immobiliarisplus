package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    PropertyDTO toDTO(Property entity);

    @Mapping(source = "ownerId", target = "owner.id")
    Property toEntity(PropertyDTO dto);
}
