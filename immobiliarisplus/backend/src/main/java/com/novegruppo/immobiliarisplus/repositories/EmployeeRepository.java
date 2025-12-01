package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByUser(User user);
    boolean existsByUser(User user);
    Optional<Employee> findByUserId(Integer userId);
    boolean existsByUserId(Integer userId);
}
