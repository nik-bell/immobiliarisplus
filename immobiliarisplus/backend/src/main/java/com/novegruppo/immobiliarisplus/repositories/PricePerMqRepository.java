package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.PricePerMq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PricePerMqRepository extends JpaRepository<PricePerMq, Integer> {

    // Find PricePerMq by zip code
    Optional<PricePerMq> findByZipCode(String zipCode);
}

