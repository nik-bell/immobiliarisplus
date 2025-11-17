package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyPhotoDTO;
import com.novegruppo.immobiliarisplus.entities.PropertyPhoto;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PropertyPhotoMapper {

    @Mapping(source = "property.id", target = "propertyId")
    PropertyPhotoDTO toDTO(PropertyPhoto entity);

    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uploadedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    PropertyPhoto fromCreate(PropertyPhotoDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "property", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uploadedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromUpdate(PropertyPhotoDTO dto, @MappingTarget PropertyPhoto entity);
}
