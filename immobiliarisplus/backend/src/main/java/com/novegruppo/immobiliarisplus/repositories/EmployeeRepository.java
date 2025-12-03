package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // find by user no ID required.
    Optional<Employee> findByUser(User user);

    //pre-insert validation no user ID required.
    boolean existsByUser(User user);

    // find by user ID for service layer convenience.
    Optional<Employee> findByUserId(Integer userId);

    //pre-insert validation and ensuring one-to-one constraints.
    boolean existsByUserId(Integer userId);
}
