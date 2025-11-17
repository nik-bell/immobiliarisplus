package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;
import com.novegruppo.immobiliarisplus.entities.PropertyDocs;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PropertyDocsMapper {

    @Mapping(source = "property.id", target = "propertyId")
    PropertyDocsDTO toDTO(PropertyDocs entity);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    PropertyDocs fromCreate(PropertyDocsDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    void updateEntityFromUpdate(PropertyDocsDTO dto, @MappingTarget PropertyDocs entity);
}