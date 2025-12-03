package com.novegruppo.immobiliarisplus.repositories;

import com.novegruppo.immobiliarisplus.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    // find by email for authentication and other purposes.
    Optional<User> findByEmail(String email);
}
