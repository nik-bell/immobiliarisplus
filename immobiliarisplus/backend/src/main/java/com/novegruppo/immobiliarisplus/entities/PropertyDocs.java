package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/* Documents up/down loads for owners is only partially implemented,
   but will be fully functional in future releases. */

@Setter
@Getter
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

    // Lombok will generate getters and setters
}
