package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "avg_price_mq")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PricePerMq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="zip_code", nullable = false, unique = true, length = 5)
    private String zipCode;

    @Column(name="city", nullable = false, length = 100)
    private String city;

    @Column(name="price_mq", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerMq;
}

