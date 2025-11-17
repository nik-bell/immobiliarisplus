package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.PropertyAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyAddressRepository extends JpaRepository<PropertyAddress, Integer> {
}
