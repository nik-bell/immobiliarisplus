package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

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

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public PropertyStatus getStatus() {
        return status;
    }

    public void setStatus(PropertyStatus status) {
        this.status = status;
    }

    public PropertyType getType() {
        return type;
    }

    public void setType(PropertyType type) {
        this.type = type;
    }

    public int getSizeMq() {
        return sizeMq;
    }

    public void setSizeMq(int sizeMq) {
        this.sizeMq = sizeMq;
    }

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) { this.floors = floors;}

    public HeatingType getHeatingType() {
        return heatingType;
    }

    public void setHeatingType(HeatingType heatingType) {
        this.heatingType = heatingType;
    }

    public EnergyClass getEnergyClass() {
        return energyClass;
    }

    public void setEnergyClass(EnergyClass energyClass) {
        this.energyClass = energyClass;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isHasBalcony() {
        return hasBalcony;
    }

    public void setHasBalcony(boolean hasBalcony) {
        this.hasBalcony = hasBalcony;
    }

    public boolean isHasGarden() {
        return hasGarden;
    }

    public void setHasGarden(boolean hasGarden) {
        this.hasGarden = hasGarden;
    }

    public boolean isHasGarage() {
        return hasGarage;
    }

    public void setHasGarage(boolean hasGarage) {
        this.hasGarage = hasGarage;
    }

    public boolean isHasElevator() {
        return hasElevator;
    }

    public void setHasElevator(boolean hasElevator) {
        this.hasElevator = hasElevator;
    }

    public boolean isHasBasement() {
        return hasBasement;
    }

    public void setHasBasement(boolean hasBasement) {
        this.hasBasement = hasBasement;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}