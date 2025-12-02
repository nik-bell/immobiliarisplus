package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.UserTokenDTO;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.entities.UserToken;
import com.novegruppo.immobiliarisplus.enums.TokenType;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:40+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class UserTokenMapperImpl implements UserTokenMapper {

    @Override
    public UserTokenDTO toDTO(UserToken entity) {
        if ( entity == null ) {
            return null;
        }

        Integer userId = null;
        Integer id = null;
        String token = null;
        TokenType type = null;
        LocalDateTime expiresAt = null;
        Boolean used = null;
        LocalDateTime createdAt = null;

        userId = entityUserId( entity );
        id = entity.getId();
        token = entity.getToken();
        type = entity.getType();
        expiresAt = entity.getExpiresAt();
        used = entity.getUsed();
        createdAt = entity.getCreatedAt();

        UserTokenDTO userTokenDTO = new UserTokenDTO( id, userId, token, type, expiresAt, used, createdAt );

        return userTokenDTO;
    }

    @Override
    public UserToken fromCreate(UserTokenDTO dto) {
        if ( dto == null ) {
            return null;
        }

        UserToken userToken = new UserToken();

        userToken.setToken( dto.token() );
        userToken.setType( dto.type() );
        userToken.setExpiresAt( dto.expiresAt() );
        userToken.setUsed( dto.used() );

        return userToken;
    }

    @Override
    public void updateEntityFromUpdate(UserTokenDTO dto, UserToken entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.token() != null ) {
            entity.setToken( dto.token() );
        }
        if ( dto.type() != null ) {
            entity.setType( dto.type() );
        }
        if ( dto.expiresAt() != null ) {
            entity.setExpiresAt( dto.expiresAt() );
        }
        if ( dto.used() != null ) {
            entity.setUsed( dto.used() );
        }
    }

    private Integer entityUserId(UserToken userToken) {
        if ( userToken == null ) {
            return null;
        }
        User user = userToken.getUser();
        if ( user == null ) {
            return null;
        }
        Integer id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
