package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "property_address")
public class PropertyAddress {

    @Id
    @Column(name = "property_id")
    private Integer propertyId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "property_id")
    private Property property;

    @Column(name = "street", nullable = false, length = 255)
    private String street;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "CAP", nullable = false, length = 10)
    private String cap;

    @Column(name = "province", nullable = false, length = 50)
    private String province;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "zone_score")
    private Integer zoneScore;

    // Lombok will generate getters and setters

}

