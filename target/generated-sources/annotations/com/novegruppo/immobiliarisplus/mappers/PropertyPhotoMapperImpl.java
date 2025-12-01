package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyPhotoDTO;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyPhoto;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PropertyPhotoMapperImpl implements PropertyPhotoMapper {

    @Override
    public PropertyPhotoDTO toDTO(PropertyPhoto entity) {
        if ( entity == null ) {
            return null;
        }

        Integer propertyId = null;
        Integer id = null;
        String url = null;
        String publicId = null;
        String format = null;
        Integer width = null;
        Integer height = null;
        Long bytes = null;
        Boolean isPrimary = null;
        LocalDateTime uploadedAt = null;
        String version = null;
        String altText = null;
        LocalDateTime createdAt = null;

        propertyId = entityPropertyId( entity );
        id = entity.getId();
        url = entity.getUrl();
        publicId = entity.getPublicId();
        format = entity.getFormat();
        width = entity.getWidth();
        height = entity.getHeight();
        bytes = entity.getBytes();
        isPrimary = entity.getIsPrimary();
        uploadedAt = entity.getUploadedAt();
        version = entity.getVersion();
        altText = entity.getAltText();
        createdAt = entity.getCreatedAt();

        PropertyPhotoDTO propertyPhotoDTO = new PropertyPhotoDTO( id, propertyId, url, publicId, format, width, height, bytes, isPrimary, uploadedAt, version, altText, createdAt );

        return propertyPhotoDTO;
    }

    @Override
    public PropertyPhoto fromCreate(PropertyPhotoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PropertyPhoto propertyPhoto = new PropertyPhoto();

        propertyPhoto.setUrl( dto.url() );
        propertyPhoto.setPublicId( dto.publicId() );
        propertyPhoto.setFormat( dto.format() );
        propertyPhoto.setWidth( dto.width() );
        propertyPhoto.setHeight( dto.height() );
        propertyPhoto.setBytes( dto.bytes() );
        propertyPhoto.setIsPrimary( dto.isPrimary() );
        propertyPhoto.setVersion( dto.version() );
        propertyPhoto.setAltText( dto.altText() );

        return propertyPhoto;
    }

    @Override
    public void updateEntityFromUpdate(PropertyPhotoDTO dto, PropertyPhoto entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.url() != null ) {
            entity.setUrl( dto.url() );
        }
        if ( dto.publicId() != null ) {
            entity.setPublicId( dto.publicId() );
        }
        if ( dto.format() != null ) {
            entity.setFormat( dto.format() );
        }
        if ( dto.width() != null ) {
            entity.setWidth( dto.width() );
        }
        if ( dto.height() != null ) {
            entity.setHeight( dto.height() );
        }
        if ( dto.bytes() != null ) {
            entity.setBytes( dto.bytes() );
        }
        if ( dto.isPrimary() != null ) {
            entity.setIsPrimary( dto.isPrimary() );
        }
        if ( dto.version() != null ) {
            entity.setVersion( dto.version() );
        }
        if ( dto.altText() != null ) {
            entity.setAltText( dto.altText() );
        }
    }

    private Integer entityPropertyId(PropertyPhoto propertyPhoto) {
        if ( propertyPhoto == null ) {
            return null;
        }
        Property property = propertyPhoto.getProperty();
        if ( property == null ) {
            return null;
        }
        int id = property.getId();
        return id;
    }
}
