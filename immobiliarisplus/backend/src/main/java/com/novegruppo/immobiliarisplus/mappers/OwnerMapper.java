package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OwnerMapper {

    @Mapping(source = "intakeDate", target = "createdAt")
    OwnerDTO toDTO(Owner entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "intakeDate", ignore = true)
    Owner fromCreate(OwnerDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "intakeDate", ignore = true)
    void updateEntityFromUpdate(OwnerDTO dto, @MappingTarget Owner entity);
}

