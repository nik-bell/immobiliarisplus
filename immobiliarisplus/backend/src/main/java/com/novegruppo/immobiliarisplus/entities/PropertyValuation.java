package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "property_valuation")
public class PropertyValuation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "improve_property")
    private Boolean improveProperty = false;

    @Column(name = "exclusive_contract")
    private Boolean exclusiveContract = false;

    @Enumerated(EnumType.STRING)
    private ValuationStatus status;

    @Column(name = "notes", length = 1000)
    private String notes;

    @Column(name = "estimated_price_min")
    private Double estimatedPriceMin;

    @Column(name = "estimated_price_max")
    private Double estimatedPriceMax;

    @Column(name = "price_per_mq")
    private Double pricePerMq;

    @Column(name = "confidence_score")
    private Integer confidenceScore;

    @Column(name = "data_source", length = 255)
    private String dataSource;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;


    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Boolean getImproveProperty() {
        return improveProperty;
    }

    public void setImproveProperty(Boolean improveProperty) {
        this.improveProperty = improveProperty;
    }

    public Boolean getExclusiveContract() {
        return exclusiveContract;
    }

    public void setExclusiveContract(Boolean exclusiveContract) {
        this.exclusiveContract = exclusiveContract;
    }


    public ValuationStatus getStatus() {
        return status;
    }

    public void setStatus(ValuationStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Double getEstimatedPriceMin() {
        return estimatedPriceMin;
    }

    public void setEstimatedPriceMin(Double estimatedPriceMin) {
        this.estimatedPriceMin = estimatedPriceMin;
    }

    public Double getEstimatedPriceMax() {
        return estimatedPriceMax;
    }

    public void setEstimatedPriceMax(Double estimatedPriceMax) {
        this.estimatedPriceMax = estimatedPriceMax;
    }

    public Double getPricePerMq() {
        return pricePerMq;
    }

    public void setPricePerMq(Double pricePerMq) {
        this.pricePerMq = pricePerMq;
    }

    public Integer getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Integer confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

