package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.enums.UserRole;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDTO(User entity) {
        if ( entity == null ) {
            return null;
        }

        Integer ownerId = null;
        Integer id = null;
        UserRole role = null;
        LocalDateTime createdAt = null;

        ownerId = entityOwnerId( entity );
        id = entity.getId();
        role = entity.getRole();
        createdAt = entity.getCreatedAt();

        String email = computeEmail(entity);

        UserDTO userDTO = new UserDTO( id, ownerId, email, role, createdAt );

        return userDTO;
    }

    @Override
    public User fromCreate(UserDTO dto) {
        if ( dto == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( dto.email() );
        user.setRole( dto.role() );

        return user;
    }

    @Override
    public void updateEntityFromUpdate(UserDTO dto, User entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.email() != null ) {
            entity.setEmail( dto.email() );
        }
        if ( dto.role() != null ) {
            entity.setRole( dto.role() );
        }
    }

    private Integer entityOwnerId(User user) {
        if ( user == null ) {
            return null;
        }
        Owner owner = user.getOwner();
        if ( owner == null ) {
            return null;
        }
        Integer id = owner.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
