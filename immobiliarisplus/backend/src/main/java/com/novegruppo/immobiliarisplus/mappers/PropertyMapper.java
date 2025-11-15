package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(source = "owner.surname", target = "ownerSurname")
    @Mapping(source = "size", target = "sizeMq")
    @Mapping(source = "hasBalcony", target = "terrace")
    @Mapping(source = "hasElevator", target = "elevator")
    @Mapping(source = "hasGarage", target = "boxAuto")
    @Mapping(source = "hasGarden", target = "garden")
    @Mapping(source = "hasBasement", target = "basement")
    PropertyDTO toDTO(Property entity);

    /@Mapping(source = "ownerId", target = "owner.id")
    @Mapping(source = "sizeMq", target = "size")
    @Mapping(source = "terrace", target = "hasBalcony")
    @Mapping(source = "elevator", target = "hasElevator")
    @Mapping(source = "boxAuto", target = "hasGarage")
    @Mapping(source = "garden", target = "hasGarden")
    @Mapping(source = "basement", target = "hasBasement")
    Property fromCreate(PropertyCreateDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "ownerId", target = "owner.id")
    @Mapping(source = "sizeMq", target = "size")
    @Mapping(source = "terrace", target = "hasBalcony")
    @Mapping(source = "elevator", target = "hasElevator")
    @Mapping(source = "boxAuto", target = "hasGarage")
    @Mapping(source = "garden", target = "hasGarden")
    @Mapping(source = "basement", target = "hasBasement")
    void updateEntityFromUpdate(PropertyUpdateDTO dto, @MappingTarget Property entity);
}
