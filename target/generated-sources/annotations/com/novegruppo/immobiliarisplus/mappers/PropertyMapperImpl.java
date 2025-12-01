package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyCreateDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyUpdateDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.enums.EnergyClass;
import com.novegruppo.immobiliarisplus.enums.HeatingType;
import com.novegruppo.immobiliarisplus.enums.PropertyStatus;
import com.novegruppo.immobiliarisplus.enums.PropertyType;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PropertyMapperImpl implements PropertyMapper {

    @Override
    public PropertyDTO toDTO(Property entity) {
        if ( entity == null ) {
            return null;
        }

        Integer ownerId = null;
        String ownerSurname = null;
        Integer sizeMq = null;
        Boolean terrace = null;
        Boolean elevator = null;
        Boolean boxAuto = null;
        Boolean garden = null;
        Boolean basement = null;
        Integer id = null;
        PropertyStatus status = null;
        PropertyType type = null;
        Integer rooms = null;
        Integer bathrooms = null;
        HeatingType heatingType = null;
        EnergyClass energyClass = null;
        String description = null;
        LocalDateTime createdAt = null;
        LocalDateTime updatedAt = null;

        ownerId = entityOwnerId( entity );
        ownerSurname = entityOwnerSurname( entity );
        sizeMq = entity.getSizeMq();
        terrace = entity.isHasBalcony();
        elevator = entity.isHasElevator();
        boxAuto = entity.isHasGarage();
        garden = entity.isHasGarden();
        basement = entity.isHasBasement();
        id = entity.getId();
        status = entity.getStatus();
        type = entity.getType();
        rooms = entity.getRooms();
        bathrooms = entity.getBathrooms();
        heatingType = entity.getHeatingType();
        energyClass = entity.getEnergyClass();
        description = entity.getDescription();
        createdAt = entity.getCreatedAt();
        updatedAt = entity.getUpdatedAt();

        int floor = 0;

        PropertyDTO propertyDTO = new PropertyDTO( id, ownerId, ownerSurname, status, type, sizeMq, rooms, bathrooms, floor, heatingType, energyClass, description, terrace, elevator, boxAuto, garden, basement, createdAt, updatedAt );

        return propertyDTO;
    }

    @Override
    public Property fromCreate(PropertyCreateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Property property = new Property();

        property.setOwner( propertyCreateDTOToOwner( dto ) );
        if ( dto.sizeMq() != null ) {
            property.setSizeMq( dto.sizeMq() );
        }
        if ( dto.terrace() != null ) {
            property.setHasBalcony( dto.terrace() );
        }
        if ( dto.elevator() != null ) {
            property.setHasElevator( dto.elevator() );
        }
        if ( dto.boxAuto() != null ) {
            property.setHasGarage( dto.boxAuto() );
        }
        if ( dto.garden() != null ) {
            property.setHasGarden( dto.garden() );
        }
        if ( dto.basement() != null ) {
            property.setHasBasement( dto.basement() );
        }
        property.setStatus( dto.status() );
        property.setType( dto.type() );
        if ( dto.rooms() != null ) {
            property.setRooms( dto.rooms() );
        }
        if ( dto.bathrooms() != null ) {
            property.setBathrooms( dto.bathrooms() );
        }
        property.setHeatingType( dto.heatingType() );
        property.setEnergyClass( dto.energyClass() );
        property.setDescription( dto.description() );

        return property;
    }

    @Override
    public void updateEntityFromUpdate(PropertyUpdateDTO dto, Property entity) {
        if ( dto == null ) {
            return;
        }

        if ( entity.getOwner() == null ) {
            entity.setOwner( new Owner() );
        }
        propertyUpdateDTOToOwner( dto, entity.getOwner() );
        if ( dto.sizeMq() != null ) {
            entity.setSizeMq( dto.sizeMq() );
        }
        if ( dto.terrace() != null ) {
            entity.setHasBalcony( dto.terrace() );
        }
        if ( dto.elevator() != null ) {
            entity.setHasElevator( dto.elevator() );
        }
        if ( dto.boxAuto() != null ) {
            entity.setHasGarage( dto.boxAuto() );
        }
        if ( dto.garden() != null ) {
            entity.setHasGarden( dto.garden() );
        }
        if ( dto.basement() != null ) {
            entity.setHasBasement( dto.basement() );
        }
        if ( dto.status() != null ) {
            entity.setStatus( Enum.valueOf( PropertyStatus.class, dto.status() ) );
        }
        if ( dto.type() != null ) {
            entity.setType( Enum.valueOf( PropertyType.class, dto.type() ) );
        }
        if ( dto.rooms() != null ) {
            entity.setRooms( dto.rooms() );
        }
        if ( dto.bathrooms() != null ) {
            entity.setBathrooms( dto.bathrooms() );
        }
        if ( dto.heatingType() != null ) {
            entity.setHeatingType( Enum.valueOf( HeatingType.class, dto.heatingType() ) );
        }
        if ( dto.energyClass() != null ) {
            entity.setEnergyClass( Enum.valueOf( EnergyClass.class, dto.energyClass() ) );
        }
        if ( dto.description() != null ) {
            entity.setDescription( dto.description() );
        }
    }

    private Integer entityOwnerId(Property property) {
        if ( property == null ) {
            return null;
        }
        Owner owner = property.getOwner();
        if ( owner == null ) {
            return null;
        }
        Integer id = owner.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private String entityOwnerSurname(Property property) {
        if ( property == null ) {
            return null;
        }
        Owner owner = property.getOwner();
        if ( owner == null ) {
            return null;
        }
        String surname = owner.getSurname();
        if ( surname == null ) {
            return null;
        }
        return surname;
    }

    protected Owner propertyCreateDTOToOwner(PropertyCreateDTO propertyCreateDTO) {
        if ( propertyCreateDTO == null ) {
            return null;
        }

        Owner owner = new Owner();

        owner.setId( propertyCreateDTO.ownerId() );

        return owner;
    }

    protected void propertyUpdateDTOToOwner(PropertyUpdateDTO propertyUpdateDTO, Owner mappingTarget) {
        if ( propertyUpdateDTO == null ) {
            return;
        }

        if ( propertyUpdateDTO.ownerId() != null ) {
            mappingTarget.setId( propertyUpdateDTO.ownerId() );
        }
    }
}
