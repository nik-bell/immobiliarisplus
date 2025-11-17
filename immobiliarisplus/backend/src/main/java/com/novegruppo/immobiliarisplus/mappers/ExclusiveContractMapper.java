package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.entities.ExclusiveContract;
import com.novegruppo.immobiliarisplus.entities.ExclusiveContractDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ExclusiveContractMapper {
    @Mapping(source = "property.id", target = "propertyId")
    ExclusiveContractDTO toDTO(ExclusiveContract entity);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    ExclusiveContract fromCreate(ExclusiveContractDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateEntityFromUpdate(ExclusiveContractDTO dto, @MappingTarget ExclusiveContract entity);
}
