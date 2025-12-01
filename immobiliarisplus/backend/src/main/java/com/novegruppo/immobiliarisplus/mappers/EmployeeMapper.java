package com.novegruppo.immobiliarisplus.mappers;


import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    @Mapping(source = "user.id", target = "userId")
    EmployeeDTO toDTO(Employee entity);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Employee fromCreate(EmployeeDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromUpdate(EmployeeDTO dto, @MappingTarget Employee entity);
}
