package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.UserTokens;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokensRepository extends JpaRepository<UserTokens, Integer> {
}
