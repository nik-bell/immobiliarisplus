package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.UserDTO;
import com.novegruppo.immobiliarisplus.entities.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(target = "email", expression = "java(computeEmail(entity))")
    UserDTO toDTO(User entity);

    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "passwordHash", ignore = true)
    User fromCreate(UserDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "passwordHash", ignore = true)
    void updateEntityFromUpdate(UserDTO dto, @MappingTarget User entity);

    default String computeEmail(User entity) {
        if (entity.getOwner() != null && entity.getOwner().getEmail() != null && !entity.getOwner().getEmail().isBlank()) {
            return entity.getOwner().getEmail();
        }
        return entity.getEmail();
    }
}
