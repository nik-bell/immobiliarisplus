package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PricePerMqDTO;
import com.novegruppo.immobiliarisplus.entities.PricePerMq;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PricePerMqMapper {
    @Mapping(target = "pricePerMq", source = "pricePerMq")
    PricePerMqDTO toDTO(PricePerMq entity);

    @Mapping(target = "pricePerMq", source = "pricePerMq")
    @Mapping(target = "id", ignore = true)
    PricePerMq toEntity(PricePerMqDTO dto);
}

