package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyAddress;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PropertyAddressMapperImpl implements PropertyAddressMapper {

    @Override
    public PropertyAddressDTO toDTO(PropertyAddress entity) {
        if ( entity == null ) {
            return null;
        }

        Integer propertyId = null;
        String street = null;
        String city = null;
        String cap = null;
        String province = null;
        Float latitude = null;
        Float longitude = null;
        Integer zoneScore = null;

        propertyId = entityPropertyId( entity );
        street = entity.getStreet();
        city = entity.getCity();
        cap = entity.getCap();
        province = entity.getProvince();
        latitude = entity.getLatitude();
        longitude = entity.getLongitude();
        zoneScore = entity.getZoneScore();

        PropertyAddressDTO propertyAddressDTO = new PropertyAddressDTO( propertyId, street, city, cap, province, latitude, longitude, zoneScore );

        return propertyAddressDTO;
    }

    @Override
    public PropertyAddress fromCreate(PropertyAddressDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PropertyAddress propertyAddress = new PropertyAddress();

        propertyAddress.setStreet( dto.street() );
        propertyAddress.setCity( dto.city() );
        propertyAddress.setCap( dto.cap() );
        propertyAddress.setProvince( dto.province() );
        propertyAddress.setLatitude( dto.latitude() );
        propertyAddress.setLongitude( dto.longitude() );
        propertyAddress.setZoneScore( dto.zoneScore() );

        return propertyAddress;
    }

    @Override
    public void updateEntityFromUpdate(PropertyAddressDTO dto, PropertyAddress entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.street() != null ) {
            entity.setStreet( dto.street() );
        }
        if ( dto.city() != null ) {
            entity.setCity( dto.city() );
        }
        if ( dto.cap() != null ) {
            entity.setCap( dto.cap() );
        }
        if ( dto.province() != null ) {
            entity.setProvince( dto.province() );
        }
        if ( dto.latitude() != null ) {
            entity.setLatitude( dto.latitude() );
        }
        if ( dto.longitude() != null ) {
            entity.setLongitude( dto.longitude() );
        }
        if ( dto.zoneScore() != null ) {
            entity.setZoneScore( dto.zoneScore() );
        }
    }

    private Integer entityPropertyId(PropertyAddress propertyAddress) {
        if ( propertyAddress == null ) {
            return null;
        }
        Property property = propertyAddress.getProperty();
        if ( property == null ) {
            return null;
        }
        int id = property.getId();
        return id;
    }
}
