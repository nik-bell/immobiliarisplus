package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.ContactPreference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "owner")
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "contact_preferences", nullable = false)
    private ContactPreference contactPreference;

    @CurrentTimestamp
    @Column(name = "intake_date", updatable = false, nullable= false)
    private LocalDateTime intakeDate;


}
