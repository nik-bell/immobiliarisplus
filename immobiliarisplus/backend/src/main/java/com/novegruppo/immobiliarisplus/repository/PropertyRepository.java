package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Owner, Integer> {
}
