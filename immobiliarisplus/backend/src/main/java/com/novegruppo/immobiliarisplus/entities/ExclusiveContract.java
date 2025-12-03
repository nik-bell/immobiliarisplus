package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.ExclusiveContractStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "exclusive_contract")
public class ExclusiveContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "contract_url", nullable = false)
    private String contractUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExclusiveContractStatus status;

    @Column(name = "signed_at")
    private LocalDateTime signedAt;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @OneToOne
    @JoinColumn(name = "property_id", nullable = false, unique = true)
    private Property property;

    // Lombok will generate getters and setters
}
