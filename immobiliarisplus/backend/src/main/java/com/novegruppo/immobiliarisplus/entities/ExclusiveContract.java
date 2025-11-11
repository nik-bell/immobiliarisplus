package com.novegruppo.immobiliarisplus.entities;

import com.novegruppo.immobiliarisplus.enums.ExclusiveContractStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    public ExclusiveContract() {}

    public int getId() {
        return id;
    }

    public String getContractUrl() {
        return contractUrl;
    }

    public ExclusiveContractStatus getStatus() {
        return status;
    }

    public LocalDateTime getSignedAt() {
        return signedAt;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public Property getProperty() {
        return property;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setContractUrl(String contractUrl) {
        this.contractUrl = contractUrl;
    }

    public void setStatus(ExclusiveContractStatus status) {
        this.status = status;
    }

    public void setSignedAt(LocalDateTime signedAt) {
        this.signedAt = signedAt;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
