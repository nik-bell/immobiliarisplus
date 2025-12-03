package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
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
    private ValuationStatus status = ValuationStatus.NOT_ASSIGNED;

    @Column(name = "notes", length = 1000)
    private String notes;

    @Column(name = "estimated_price_min")
    private Double estimatedPriceMin;

    @Column(name = "estimated_price_max")
    private Double estimatedPriceMax;

    @Column(name = "valuation_final")
    private Double valuationFinal;

    @Column(name = "price_per_mq")
    private Double pricePerMq;

    @Column(name = "confidence_score")
    private Integer confidenceScore;

    @Column(name = "data_source", length = 255)
    private String dataSource;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    // Lombok will generate getters and setters

}

