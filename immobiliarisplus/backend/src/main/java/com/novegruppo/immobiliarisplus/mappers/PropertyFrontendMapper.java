package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyAddressDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.*;

public class PropertyFrontendMapper {

    public static PropertyFrontendDTO toFrontendDTO(PropertyDTO property, OwnerDTO owner, PropertyAddressDTO address) {
        // Estrae i dati di indirizzo se disponibili
        String street = address != null ? address.street() : null;
        String cap = address != null ? address.cap() : null;
        String city = address != null ? address.city() : null;

        PropertyInfoDTO propertyInfo = new PropertyInfoDTO(
                street,
                cap,
                city,
                property != null && property.type() != null ? property.type().toString() : null,
                property != null && property.status() != null ? property.status().toString() : null,
                property != null ? property.sizeMq() : null
        );

        PropertyFeaturesDTO features = new PropertyFeaturesDTO(
                false,                 // balcone non presente nel backend
                property != null ? property.boxAuto() : null,
                property != null ? property.garden() : null,
                false,                 // parcheggio non presente nel backend
                property != null ? property.terrace() : null,
                property != null ? property.elevator() : null,
                property != null ? property.basement() : null
        );

        PropertyDetailsDTO details = new PropertyDetailsDTO(
                property != null ? property.rooms() : null,
                property != null ? property.bathrooms() : null,
                property != null ? property.floor() : null,
                features
        );

        PropertyContactDTO contact = new PropertyContactDTO(
                owner != null ? owner.name() : null,
                owner != null ? owner.surname() : null,
                owner != null ? owner.email() : null,
                owner != null ? owner.phone() : null,
                true                    // privacyAccepted lato frontend (puoi cambiare)
        );

        return new PropertyFrontendDTO(propertyInfo, details, contact);
    }
}
