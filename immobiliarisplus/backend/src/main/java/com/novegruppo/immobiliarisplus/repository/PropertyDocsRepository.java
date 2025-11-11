package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.PropertyDocs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyDocsRepository extends JpaRepository<Owner, Integer> {
}
