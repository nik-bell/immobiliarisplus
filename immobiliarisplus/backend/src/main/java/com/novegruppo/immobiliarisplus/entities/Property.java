package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "property")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Owner owner;

    @Enumerated(EnumType.STRING)
    private PropertyStatus status;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    @Column(name="size_mq", nullable = false)
    private int sizeMq;

    @Column(name="rooms", nullable = false)
    private int rooms;

    @Column(name="bathrooms", nullable = false)
    private int bathrooms;

    @Column(name="floors", nullable = false)
    private int floors;

    @Enumerated(EnumType.STRING)
    private HeatingType heatingType;

    @Enumerated(EnumType.STRING)
    private EnergyClass energyClass;

    @Column(name="description", columnDefinition="TEXT")
    private String description;

    @Column(name="terrace", nullable = false)
    private boolean hasBalcony;

    @Column(name="garden", nullable = false)
    private boolean hasGarden;

    @Column(name="box_auto", nullable = false)
    private boolean hasGarage;

    @Column(name="elevator", nullable = false)
    private boolean hasElevator;

    @Column(name="basement", nullable = false)
    private boolean hasBasement;

    @Column(name="created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name="updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Lombok will generate getters and setters

}