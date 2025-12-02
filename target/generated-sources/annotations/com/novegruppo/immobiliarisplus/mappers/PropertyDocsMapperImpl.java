package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyDocs;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PropertyDocsMapperImpl implements PropertyDocsMapper {

    @Override
    public PropertyDocsDTO toDTO(PropertyDocs entity) {
        if ( entity == null ) {
            return null;
        }

        Integer propertyId = null;
        Integer id = null;
        String fileName = null;

        propertyId = entityPropertyId( entity );
        id = entity.getId();
        fileName = entity.getFileName();

        PropertyDocsDTO propertyDocsDTO = new PropertyDocsDTO( id, propertyId, fileName );

        return propertyDocsDTO;
    }

    @Override
    public PropertyDocs fromCreate(PropertyDocsDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PropertyDocs propertyDocs = new PropertyDocs();

        propertyDocs.setFileName( dto.fileName() );

        return propertyDocs;
    }

    @Override
    public void updateEntityFromUpdate(PropertyDocsDTO dto, PropertyDocs entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.fileName() != null ) {
            entity.setFileName( dto.fileName() );
        }
    }

    private Integer entityPropertyId(PropertyDocs propertyDocs) {
        if ( propertyDocs == null ) {
            return null;
        }
        Property property = propertyDocs.getProperty();
        if ( property == null ) {
            return null;
        }
        int id = property.getId();
        return id;
    }
}
