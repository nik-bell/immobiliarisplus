package com.novegruppo.immobiliarisplus.entities;

import jakarta.persistence.*;

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

    // Constructors
    public PropertyAddress() {
    }

    public PropertyAddress(Property property, String street, String city, String cap, String province) {
        this.property = property;
        this.street = street;
        this.city = city;
        this.cap = cap;
        this.province = province;
    }

    // Getters and Setters
    public Integer getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Integer propertyId) {
        this.propertyId = propertyId;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Integer getZoneScore() {
        return zoneScore;
    }

    public void setZoneScore(Integer zoneScore) {
        this.zoneScore = zoneScore;
    }
}

