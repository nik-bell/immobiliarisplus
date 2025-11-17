package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTokensRepository extends JpaRepository<UserToken, Integer> {
}
