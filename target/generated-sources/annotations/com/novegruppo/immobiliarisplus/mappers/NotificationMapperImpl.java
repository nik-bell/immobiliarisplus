package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.NotificationDTO;
import com.novegruppo.immobiliarisplus.entities.Notification;
import com.novegruppo.immobiliarisplus.entities.User;
import com.novegruppo.immobiliarisplus.enums.NotificationRoleTarget;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationDTO toDTO(Notification entity) {
        if ( entity == null ) {
            return null;
        }

        Integer recipientId = null;
        Integer id = null;
        NotificationRoleTarget roleTarget = null;
        String content = null;
        Boolean isRead = null;
        LocalDateTime createdAt = null;

        recipientId = entityRecipientId( entity );
        id = entity.getId();
        roleTarget = entity.getRoleTarget();
        content = entity.getContent();
        isRead = entity.getIsRead();
        createdAt = entity.getCreatedAt();

        NotificationDTO notificationDTO = new NotificationDTO( id, recipientId, roleTarget, content, isRead, createdAt );

        return notificationDTO;
    }

    @Override
    public Notification fromCreate(NotificationDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Notification notification = new Notification();

        notification.setRoleTarget( dto.roleTarget() );
        notification.setContent( dto.content() );
        notification.setIsRead( dto.isRead() );

        return notification;
    }

    @Override
    public void updateEntityFromUpdate(NotificationDTO dto, Notification entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.roleTarget() != null ) {
            entity.setRoleTarget( dto.roleTarget() );
        }
        if ( dto.content() != null ) {
            entity.setContent( dto.content() );
        }
        if ( dto.isRead() != null ) {
            entity.setIsRead( dto.isRead() );
        }
    }

    private Integer entityRecipientId(Notification notification) {
        if ( notification == null ) {
            return null;
        }
        User recipient = notification.getRecipient();
        if ( recipient == null ) {
            return null;
        }
        Integer id = recipient.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
