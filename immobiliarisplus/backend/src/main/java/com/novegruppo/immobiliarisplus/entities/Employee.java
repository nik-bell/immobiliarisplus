package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "employee", uniqueConstraints = {
    @UniqueConstraint(name = "uk_employee_user_id", columnNames = "user_id")
})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    private String phone;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Lombok will generate getters and setters

}
