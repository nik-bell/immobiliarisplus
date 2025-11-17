package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
