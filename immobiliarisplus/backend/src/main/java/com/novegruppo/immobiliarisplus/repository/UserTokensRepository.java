package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.UserTokens;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokensRepository extends JpaRepository<Owner, Integer> {
}
