package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.PropertyPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyPhotoRepository extends JpaRepository<Owner, Integer> {
}
