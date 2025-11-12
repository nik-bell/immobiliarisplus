package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;

/**
 * Modello JPA per rappresentare un documento associato ad una proprietà.
 * Ogni Property può avere più documenti, quindi la relazione è ManyToOne.
 * Contiene:
 *  - id: identificativo univoco
 *  - fileName: nome o percorso del file
 *  - property: FK verso Property
 */
@Entity
@Table(name = "property_docs")
public class PropertyDocs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; 

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

}
