package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Rappresenta un contratto di esclusiva collegato ad una sola proprietà.
 * La relazione è 1:1 → una property può avere al massimo un solo contratto attivo.
 */
@Entity
@Table(name = "exclusive_contract")
public class ExclusiveContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * URL o percorso del file del contratto (PDF, immagine, ecc).
     * Non salviamo il file nel DB, ma solo il riferimento.
     */
    @Column(name = "contract_url", nullable = false)
    private String contractUrl;

    /**
     * Stato del contratto (es: ACTIVE, EXPIRED, PENDING).
     * Ti conviene poi creare un enum.
     */
    @Column(nullable = false)
    private String status;

    /**
     * Data di firma del contratto.
     */
    @Column(name = "signed_at")
    private LocalDateTime signedAt;

    /**
     * Data di scadenza del contratto.
     */
    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    /**
     * Relazione One-to-One con Property.
     * Una proprietà può avere un solo contratto di esclusiva.
     */
    @OneToOne
    @JoinColumn(name = "property_id", nullable = false, unique = true)
    private Property property;

    // Costruttore vuoto richiesto da JPA
    public ExclusiveContract() {}

    // Getters & setters

    public Long getId() {
        return id;
    }

    public String getContractUrl() {
        return contractUrl;
    }

    public String getStatus() {
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setContractUrl(String contractUrl) {
        this.contractUrl = contractUrl;
    }

    public void setStatus(String status) {
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
