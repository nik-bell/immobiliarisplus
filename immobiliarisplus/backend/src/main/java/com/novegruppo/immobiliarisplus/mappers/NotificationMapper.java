package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.entities.Notification;
import com.novegruppo.immobiliarisplus.dtos.NotificationDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

    @Mapping(source = "recipient.id", target = "recipientId")
    NotificationDTO toDTO(Notification entity);

    @Mapping(target = "recipient", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Notification fromCreate(NotificationDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "recipient", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromUpdate(NotificationDTO dto, @MappingTarget Notification entity);
}
