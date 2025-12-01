package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PricePerMqDTO;
import com.novegruppo.immobiliarisplus.entities.PricePerMq;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PricePerMqMapperImpl implements PricePerMqMapper {

    @Override
    public PricePerMqDTO toDTO(PricePerMq entity) {
        if ( entity == null ) {
            return null;
        }

        BigDecimal pricePerMq = null;
        Integer id = null;
        String zipCode = null;
        String city = null;

        pricePerMq = entity.getPricePerMq();
        id = entity.getId();
        zipCode = entity.getZipCode();
        city = entity.getCity();

        PricePerMqDTO pricePerMqDTO = new PricePerMqDTO( id, zipCode, city, pricePerMq );

        return pricePerMqDTO;
    }

    @Override
    public PricePerMq toEntity(PricePerMqDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PricePerMq pricePerMq = new PricePerMq();

        pricePerMq.setPricePerMq( dto.pricePerMq() );
        pricePerMq.setZipCode( dto.zipCode() );
        pricePerMq.setCity( dto.city() );

        return pricePerMq;
    }
}
