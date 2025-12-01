package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.enums.ContactPreference;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class OwnerMapperImpl implements OwnerMapper {

    @Override
    public OwnerDTO toDTO(Owner entity) {
        if ( entity == null ) {
            return null;
        }

        LocalDateTime createdAt = null;
        Integer id = null;
        String name = null;
        String surname = null;
        String email = null;
        String phone = null;
        ContactPreference contactPreference = null;

        createdAt = entity.getIntakeDate();
        id = entity.getId();
        name = entity.getName();
        surname = entity.getSurname();
        email = entity.getEmail();
        phone = entity.getPhone();
        contactPreference = entity.getContactPreference();

        OwnerDTO ownerDTO = new OwnerDTO( id, name, surname, email, phone, contactPreference, createdAt );

        return ownerDTO;
    }

    @Override
    public Owner fromCreate(OwnerDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Owner owner = new Owner();

        owner.setName( dto.name() );
        owner.setSurname( dto.surname() );
        owner.setEmail( dto.email() );
        owner.setPhone( dto.phone() );
        owner.setContactPreference( dto.contactPreference() );

        return owner;
    }

    @Override
    public void updateEntityFromUpdate(OwnerDTO dto, Owner entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.name() != null ) {
            entity.setName( dto.name() );
        }
        if ( dto.surname() != null ) {
            entity.setSurname( dto.surname() );
        }
        if ( dto.email() != null ) {
            entity.setEmail( dto.email() );
        }
        if ( dto.phone() != null ) {
            entity.setPhone( dto.phone() );
        }
        if ( dto.contactPreference() != null ) {
            entity.setContactPreference( dto.contactPreference() );
        }
    }
}
