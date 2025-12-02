package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.UserTokenDTO;
import com.novegruppo.immobiliarisplus.entities.UserToken;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserTokenMapper {

    @Mapping(source = "user.id", target = "userId")
    UserTokenDTO toDTO(UserToken entity);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    UserToken fromCreate(UserTokenDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromUpdate(UserTokenDTO dto, @MappingTarget UserToken entity);
}

