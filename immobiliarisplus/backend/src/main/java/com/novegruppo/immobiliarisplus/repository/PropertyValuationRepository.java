package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.PropertyValuation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyValuationRepository extends JpaRepository<Owner, Integer> {
}
