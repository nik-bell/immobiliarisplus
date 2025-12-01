package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.EmployeeDTO;
import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.entities.User;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class EmployeeMapperImpl implements EmployeeMapper {

    @Override
    public EmployeeDTO toDTO(Employee entity) {
        if ( entity == null ) {
            return null;
        }

        Integer userId = null;
        Integer id = null;
        String name = null;
        String surname = null;
        String phone = null;
        LocalDateTime createdAt = null;

        userId = entityUserId( entity );
        id = entity.getId();
        name = entity.getName();
        surname = entity.getSurname();
        phone = entity.getPhone();
        createdAt = entity.getCreatedAt();

        EmployeeDTO employeeDTO = new EmployeeDTO( id, userId, name, surname, phone, createdAt );

        return employeeDTO;
    }

    @Override
    public Employee fromCreate(EmployeeDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Employee employee = new Employee();

        employee.setName( dto.name() );
        employee.setSurname( dto.surname() );
        employee.setPhone( dto.phone() );

        return employee;
    }

    @Override
    public void updateEntityFromUpdate(EmployeeDTO dto, Employee entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.name() != null ) {
            entity.setName( dto.name() );
        }
        if ( dto.surname() != null ) {
            entity.setSurname( dto.surname() );
        }
        if ( dto.phone() != null ) {
            entity.setPhone( dto.phone() );
        }
    }

    private Integer entityUserId(Employee employee) {
        if ( employee == null ) {
            return null;
        }
        User user = employee.getUser();
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
