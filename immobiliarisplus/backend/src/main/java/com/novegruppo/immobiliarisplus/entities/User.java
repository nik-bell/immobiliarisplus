package com.novegruppo.immobiliarisplus.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.novegruppo.immobiliarisplus.enums.UserRole;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @JsonIgnore
    private Owner owner;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Employee employee;


    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;


    // Lombok will generate getters and setters
}
